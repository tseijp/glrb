import * as React from 'react'
import { scrollEvent } from '@site/hooks/useScrollEventStore'

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
        const listeners = new Set<any>()
        const subscribe = (callback: any) => {
                if (!callback) return
                listeners.add(callback)
                return () => void listeners.delete(callback)
        }

        const scroll = scrollEvent()

        const ref = (el: Element) => {
                resetScrollPosition(0)
                if (el) scroll.onMount(document as unknown as Element)
                else scroll.onClean()
        }

        /**
         * scroll
         */
        let y = 0 // y to move target  ... -y 0
        let dy = 0 // movement y       ... -1 ~ 1
        let vy = 0 // velocity vy      ... 0 ~ 1
        let sy = 0 // sign y           ... -1, 0 or 1
        let iy = 0 // current y        ... 0 or 1

        // reset scroll position if not scrolling
        const resetScrollPosition = (top = 0) => {
                if (!self.isGestureEnd) return // since events are stacked in duplicate.
                window.scrollTo({ top, behavior: 'instant' })
                isClicking = false
        }

        const onGesture = () => {
                listeners.forEach((f) => f(self))
        }

        const onGestureing = () => {
                const h = window.innerHeight
                y = -h * (iy + dy)
                y = clamp(y, -h, 0)
        }

        const onGestureEnd = () => {
                const h = window.innerHeight
                iy += sy
                iy = clamp(iy, 0, 1)
                y = -iy * h
                setTimeout(() => resetScrollPosition(-y), 100)
        }

        const onClick = () => {
                isClicking = true
                sy = 1
                onGestureEnd()
                onGesture()
        }

        scroll.subscribe((state) => {
                const {
                        isScrolling,
                        isScrollEnd,
                        value: [, _y],
                        delta: [, _vy],
                        movement,
                } = state
                const h = window.innerHeight
                if (0.01 < _y && _y < h - 0.01) {
                        dy = movement[1] / h
                        vy = Math.max(vy, Math.abs(_vy / h))
                        sy = Math.abs(dy) > DELTA_THRESHOLD ? Math.sign(dy) : 0
                        if (sy === 0)
                                sy = vy > SWIPE_THRESHOLD ? Math.sign(dy) : 0
                        if (isScrollEnd) onGestureEnd()
                        if (isScrolling) onGestureing()
                        onGesture()
                }

                // reset values
                dy = 0
                if (isScrollEnd) vy = 0
        })

        const self = {
                subscribe,
                ref,
                onClick,
                onGesture,
                onGestureing,
                onGestureEnd,
                get y() {
                        return y
                },
                get vy() {
                        return vy
                },
                get dy() {
                        if (self.isGestureing) {
                                let ret = dy / DELTA_THRESHOLD
                                ret = Math.pow(ret, 3) // odd !!
                                if (ret < 0) ret = 1 + ret
                                return clamp(ret, 0, 1)
                        }
                        return iy
                },
                get isGestureStart() {
                        return scroll.isScrollStart
                },
                get isGestureing() {
                        return scroll.isScrolling
                },
                get isGestureEnd() {
                        return scroll.isScrollEnd || isClicking
                },
        }

        return self
}

const gesture = createGesture()

export const useGestureEventStore = (callback?: (state: any) => void) => {
        return React.useSyncExternalStore(
                () => gesture.subscribe(callback),
                () => gesture,
                () => gesture
        )
}
