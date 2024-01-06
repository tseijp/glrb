import * as React from 'react'
import { vec2, addV, cpV } from './utils'

const LINE_HEIGHT = 40

const PAGE_HEIGHT = 800

export const wheelValues = (event: Event, out = vec2()) => {
        if (!(event instanceof WheelEvent)) return vec2(0, 0, out)

        let { deltaX, deltaY, deltaMode } = event
        if (deltaMode === 1) {
                deltaX *= LINE_HEIGHT
                deltaY *= LINE_HEIGHT
        } else if (deltaMode === 2) {
                deltaX *= PAGE_HEIGHT
                deltaY *= PAGE_HEIGHT
        }
        return vec2(deltaX, deltaY, out)
}

export const wheelEvent = () => {
        const listeners = new Set<(_self: any) => void>()
        const subscribe = (callback: WheelCallback) => {
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

        const onWheel = (_e: Event) => {
                self.isWheelStart = self.active && !self._active
                self.isWheeling = self.active && self._active
                self.isWheelEnd = !self.active && self._active
                listeners.forEach((f) => f(self))
        }

        const onWheelStart = (e: WheelEvent) => {
                self.active = true
                wheelValues(e, self.delta)
                self.onWheel(e)
        }

        const onWheeling = (e: Event) => {
                self.event = e
                self.target = e.target
                self._active = self.active

                // register onWheelEnd
                const id = setTimeout(() => self.onWheelEnd(e), self.timeout)
                self.clearTimeout()
                self.clearTimeout = () => clearTimeout(id)

                if (!self.active) {
                        self.onWheelStart(e as WheelEvent)
                        return
                }

                cpV(self.value, self._value)
                wheelValues(e, self.delta)
                addV(self.offset, self.delta, self.offset)
                addV(self.movement, self.delta, self.movement)
                self.onWheel(e)
        }

        const onWheelEnd = (e: Event) => {
                self.event = e
                self.active = false
                self.onWheel(e)
                initValues()
        }

        const onMount = (target: Element) => {
                self.target = target
                target.addEventListener('wheel', self.onWheeling)
        }

        const onClean = () => {
                const target = self.target
                if (!target) return
                target.removeEventListener('wheel', self.onWheeling)
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
                timeout: 100,
                clearTimeout: () => {},
                memo: {} as any,
                isWheelStart: false,
                isWheeling: false,
                isWheelEnd: false,
                onWheel,
                onWheelStart,
                onWheeling,
                onWheelEnd,
                onMount,
                onClean,
                ref,
        }

        return self
}

const wheel = wheelEvent()

type WheelCallback = (self: typeof wheel) => void

export const useWheelEventStore = (callback?: WheelCallback) => {
        React.useSyncExternalStore(
                () => wheel.subscribe(callback),
                () => wheel,
                () => wheel
        )
        return wheel
}

export default wheel
