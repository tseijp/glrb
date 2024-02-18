import * as React from 'react'
import { ScrollStore } from './useScroll'

/**
 * 0.02276 represents a balance between the two distributions.
 * - [0.005, 0.005, 0.0075, 0.005, 0.0075, 0.0625, 0.00375, 0.005, 0.00375, 0.00375]
 *   - Mean: 0.01088
 *   - Std: 0.01726
 * - [0.035, 0.035, 0.02175, 0.0325, 0.06375, 0.0425, 0.02225, 0.02, 0.0425, 0.03125]
 *   - Mean: 0.03465
 *   - Std: 0.01233
 */
const DELTA_THRESHOLD = 0.45 // threshold for movement
const SWIPE_THRESHOLD = 0.02276 // threshold for velocity based on a normal distribution

const clamp = (x: number, min: number, max: number) => {
        if (x < min) return min
        if (x > max) return max
        return x
}

export const createGesture = () => {
        const listeners = new Set<Function>()
        const subscribe = (callback: any) => {
                listeners.add(callback)
                return () => {
                        listeners.delete(callback)
                }
        }

        /**
         * scroll
         */
        let dy = 0 // movement y       ... -1 ~ 1
        let vy = 0 // velocity vy      ... 0 ~ 1
        let sy = 0 // sign y           ... -1, 0 or 1
        let iy = 0 // current y        ... 0 or 1

        const _dy = (isGestureing: boolean) => {
                if (isGestureing) {
                        let ret = dy / DELTA_THRESHOLD + 0.05
                        ret = Math.pow(ret, 3) // odd !!
                        if (ret < 0) ret = 1 + ret
                        return clamp(ret, 0, 1)
                }
                return iy
        }

        const callback = (state: ScrollStore) => {
                const {
                        value: [, _y],
                        delta: [, _vy],
                        movement,
                } = state

                const h = window.innerHeight
                dy = movement[1] / h
                vy = Math.max(vy, Math.abs(_vy / h))
                sy = Math.abs(dy) > DELTA_THRESHOLD ? Math.sign(dy) : 0
                if (sy === 0) sy = vy > SWIPE_THRESHOLD ? Math.sign(dy) : 0

                // reset values
                // dy = 0
                // if (isScrollEnd) vy = 0

                console.log({ dy, vy, sy, iy })
        }

        return {
                _dy,
                subscribe,
                callback,
        }
}

export const useScrollGesture = (callback: (state: ScrollStore) => void) => {
        const [gesture] = React.useState(createGesture)
        React.useEffect(() => gesture.subscribe(callback), [callback])
        return gesture
}
