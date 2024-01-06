import * as React from 'react'
import { scrollEvent } from '@site/hooks/useScrollEventStore'

const THRESHOLD = 0.25 // swipe threshold

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
        let dy = 0 // movement y ... -h ~ h
        let sy = 0 // sign y     ... -1, 0 or 1
        let iy = 0 // current y  ... 0 or 1
        let isClicking = false // true if clicked
        let isDisabled = false // true if y < -h or 0 < y

        // reset scroll position if not scrolling
        const resetScrollPosition = (top = 0) => {
                if (!self.isGestureEnd) return
                window.scrollTo({ top, behavior: 'instant' })
        }

        const onGesture = () => {
                self.isGestureStart = scroll.isScrollStart
                self.isGestureing = scroll.isScrolling
                self.isGestureEnd = scroll.isScrollEnd || isClicking
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
                isClicking = false
        }

        scroll.subscribe((state) => {
                const {
                        isScrolling,
                        isScrollEnd,
                        value: [, _y],
                        movement,
                } = state
                const h = window.innerHeight
                if (_y < 0 || h < _y) return
                dy = movement[1] / h
                sy = Math.abs(dy) > THRESHOLD ? Math.sign(dy) : 0
                if (isScrollEnd) onGestureEnd()
                if (isScrolling) onGestureing()
                onGesture()
                dy = 0 // reset values
        })

        const self = {
                subscribe,
                ref,
                onClick,
                onGesture,
                onGestureing,
                onGestureEnd,
                isGestureStart: false,
                isGestureing: false,
                isGestureEnd: false,
                get y() {
                        return y
                },
                get dy() {
                        if (self.isGestureing) {
                                let ret = dy / THRESHOLD
                                ret = Math.pow(ret, 3) // odd !!
                                if (ret < 0) ret = 1 + ret
                                return clamp(ret, 0, 1)
                        }
                        return iy
                },
                get isDisabled() {
                        return isDisabled
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
