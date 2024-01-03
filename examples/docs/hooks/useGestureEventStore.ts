import * as React from 'react'
import { dragEvent } from '@site/hooks/useDragEventStore'
import { scrollEvent } from '@site/hooks/useScrollEventStore'

const THRESHOLD = 0.25 // swipe threshold

export const createGesture = () => {
        const listeners = new Set<any>()
        const subscribe = (callback: any) => {
                if (!callback) return
                listeners.add(callback)
                return () => void listeners.delete(callback)
        }

        const drag = dragEvent()
        const scroll = scrollEvent()

        const ref = (el: Element) => {
                // drag.ref(el)
                window.scrollTo(0, 0)
                if (el) scroll.onMount(document as unknown as Element)
                else scroll.onClean()
        }

        /**
         * drag and scroll
         */
        let y = 0 // movement y  ... 0 ~ h
        let dy = 0 // movement y ... -h ~ h
        let sy = 0 // sign y     ... -1, 0 or 1
        let iy = 0 // current y  ... 0 or 1

        const onGesture = (self: any) => {
                self.isGestureStart = drag.isDragStart || scroll.isScrollStart
                self.isGestureing = drag.isDragging || scroll.isScrolling
                self.isGestureEnd = drag.isDragEnd || scroll.isScrollEnd
                listeners.forEach((f) => f(self))
        }

        const onGestureStart = () => {
                y = 0
                dy = 0
                sy = 0
                iy = 0
        }

        const onGestureing = () => {
                y = iy * window.innerHeight + dy
                if (y < 0) y = 0
                if (y > window.innerHeight) y = window.innerHeight
        }

        const onGestureEnd = () => {
                const h = window.innerHeight
                sy = Math.abs(dy) > Math.abs(h) * THRESHOLD ? Math.sign(dy) : 0
                iy += sy
                if (iy < 0) iy = 0
                if (iy > 1) iy = 1
                window.scrollTo(0, iy * h)
        }

        drag.subscribe((state) => {
                // if (scroll.active) return
                // const { isDragStart, isDragging, isDragEnd, movement } = state
                // if (isDragging) {
                //         // dy = movement[1]
                //         // onGestureing()
                // }
                // if (isDragEnd) {
                //         // const h = window.innerHeight / 2
                //         // onGestureEnd()
                // }
                // onGesture(self)
        })

        scroll.subscribe((state) => {
                if (drag.active) return
                const { isScrollStart, isScrolling, isScrollEnd, movement } =
                        state
                if (isScrollStart) {
                        onGestureStart()
                }

                if (isScrolling) {
                        sy = 0
                        dy = movement[1]
                        onGestureing()
                }
                if (isScrollEnd) {
                        onGestureEnd()
                        y = iy * window.innerHeight
                }
                onGesture(self)
        })

        const self = {
                subscribe,
                ref,
                isGestureStart: false,
                isGestureing: false,
                isGestureEnd: false,
                get y() {
                        return y
                },
                get dy() {
                        return dy
                },
                get sy() {
                        return sy
                },
                get iy() {
                        return iy
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
