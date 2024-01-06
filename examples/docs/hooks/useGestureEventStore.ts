import * as React from 'react'
import { scrollEvent } from '@site/hooks/useScrollEventStore'

const THRESHOLD = 0.25 // swipe threshold

export const createGesture = () => {
        const listeners = new Set<any>()
        const subscribe = (callback: any) => {
                if (!callback) return
                listeners.add(callback)
                return () => void listeners.delete(callback)
        }

        const scroll = scrollEvent()

        const ref = (el: Element) => {
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
        let disable = false // true if scroll by window.scrollTo
        let isClicking = false // true if clicked

        // reset scroll position if not scrolling
        const resetScrollPosition = () => {
                if (!self.isGestureEnd) return
                const h = window.innerHeight
                disable = true
                window.scrollTo({ top: iy * h, behavior: 'instant' })
                disable = false
        }

        const onGesture = () => {
                self.isGestureStart = scroll.isScrollStart
                self.isGestureing = scroll.isScrolling
                self.isGestureEnd = scroll.isScrollEnd || isClicking
                listeners.forEach((f) => f(self))
        }

        const onGestureing = () => {
                y = -window.innerHeight * (iy + dy)
                if (y > 0) y = 0
                if (y < -window.innerHeight) y = -window.innerHeight
        }

        const onGestureEnd = () => {
                sy = Math.abs(dy) > THRESHOLD ? Math.sign(dy) : 0
                iy += sy
                // y = -iy * window.innerHeight
                if (iy < 0) iy = 0
                if (iy > 1) iy = 1
                setTimeout(resetScrollPosition, 100)
        }

        const onClick = () => {
                sy = 1
                iy += sy
                if (iy < 0) iy = 0
                if (iy > 1) iy = 1

                isClicking = true
                onGesture()
                setTimeout(resetScrollPosition, 100)
                isClicking = false
        }

        scroll.subscribe((state) => {
                const { isScrolling, isScrollEnd, movement } = state
                const h = window.innerHeight
                if (isScrolling) {
                        dy = movement[1] / h
                        onGestureing()
                }
                if (isScrollEnd) {
                        onGestureEnd()
                        y = -iy * window.innerHeight
                }
                onGesture()
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
                                if (ret < 0) ret = 1 + dy
                                return 1 - ret
                        }
                        return 1 - iy
                },
                get disable() {
                        return disable
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
