import * as React from 'react'
import { vec2, addV, cpV, subV } from './utils'

export const scrollValues = (e: any, out = vec2()) => {
        const { scrollX: x, scrollLeft: xx } = e.currentTarget
        const { scrollY: y, scrollTop: yy } = e.currentTarget
        return vec2(x ?? xx ?? 0, y ?? yy ?? 0, out)
}

export const scrollEvent = () => {
        const listeners = new Set<(_self: any) => void>()
        const subscribe = (callback?: ScrollCallback) => {
                if (!callback) return
                listeners.add(callback)
                return () => listeners.delete(callback)
        }

        const initValues = () => {
                vec2(0, 0, self.value)
                vec2(0, 0, self._value)
                vec2(0, 0, self.delta)
                vec2(0, 0, self.movement)
        }

        const onScroll = (_e: Event) => {
                self.isScrollStart = self.active && !self._active
                self.isScrolling = self.active && self._active
                self.isScrollEnd = !self.active && self._active
                listeners.forEach((f) => f(self))
        }

        const onScrollStart = (e: Event) => {
                self.active = true
                scrollValues(e, self.value)
                self.onScroll(e)
        }

        const onScrolling = (e: Event) => {
                self.event = e
                self.target = e.target
                self._active = self.active

                if (!self.active) {
                        self.onScrollStart(e)
                        return
                }

                cpV(self.value, self._value)
                scrollValues(e, self.value)

                if (self._active) {
                        subV(self.value, self._value, self.delta)
                        addV(self.offset, self.delta, self.offset)
                        addV(self.movement, self.delta, self.movement)
                }

                self.onScroll(e)
        }

        const onScrollEnd = (e: Event) => {
                self.event = e
                self.target = e.target
                self._active = self.active
                self.active = false
                self.onScroll(e)
                initValues()
        }

        const onMount = (target: Element) => {
                self.target = target
                window.addEventListener('scroll', self.onScrolling)
                window.addEventListener('scrollend', self.onScrollEnd)
        }

        const onClean = () => {
                const target = self.target
                if (!target) return
                window.removeEventListener('scroll', self.onScrolling)
                window.removeEventListener('scrollend', self.onScrollEnd)
        }

        const ref = (el: Element | null) => {
                if (el) {
                        self.onMount(el)
                } else self.onClean()
        }

        const self = {
                listeners,
                subscribe,
                active: false,
                _active: false,
                _value: vec2(0, 0),
                value: vec2(0, 0),
                delta: vec2(0, 0),
                offset: vec2(0, 0),
                movement: vec2(0, 0),
                target: null,
                event: null,
                memo: {} as any,
                isScrollStart: false,
                isScrolling: false,
                isScrollEnd: false,
                onScroll,
                onScrollStart,
                onScrolling,
                onScrollEnd,
                onMount,
                onClean,
                ref,
        }

        return self
}

const scroll = scrollEvent()

type ScrollCallback = (self: typeof scroll) => void

export const useScrollEventStore = (callback?: ScrollCallback) => {
        React.useSyncExternalStore(
                () => scroll.subscribe(callback),
                () => scroll,
                () => scroll
        )
        return scroll
}

export default scroll
