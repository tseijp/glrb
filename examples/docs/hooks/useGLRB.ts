import * as React from 'react'
import { createGL } from 'glre'
import { useOnce } from './useOnce'

const opt = { premultipliedAlpha: false }

export const createGLRB = (frag: string) => {
        let gl = createGL()
        let el: HTMLCanvasElement
        let callback = () => {}
        let snapshot = 0
        let err: Error

        const update = () => {
                snapshot++
                callback()
        }

        const resize = () => {
                let w = window.innerWidth
                if (w >= 996) w *= 0.45
                let h = w * 0.65
                gl.resize({} as any, w, h)
        }

        const mount = () => {
                try {
                        gl.el = el
                        gl.gl = el.getContext('webgl2', opt)
                        gl.init()
                        resize()
                        gl.render()
                        gl.clear()
                        gl.viewport()
                        gl.drawArrays()
                        window.addEventListener('resize', resize)
                } catch (e) {
                        console.warn((err = e))
                        update()
                }
        }

        const unmount = () => {
                window.removeEventListener('resize', resize)
                try {
                        gl.gl?.deleteProgram?.(gl.pg)
                } catch (e) {
                        console.warn((err = e))
                        update()
                }
        }

        const ref = (_el: HTMLCanvasElement | null) => {
                if (!_el) return unmount()
                el = _el
                mount()
        }

        const set = (_frag = frag) => {
                unmount()
                gl = createGL()
                // frag = _frag
                mount()
        }

        const get = () => snapshot

        const sub = (_callback = callback) => {
                callback = _callback
                return () => (callback = () => {})
        }

        return {
                ref,
                set,
                sub,
                get,
                get err() {
                        return err as any
                },
        }
}

export const useGLRB = (frag?: string) => {
        const glrb = useOnce(() => createGLRB(frag))
        React.useSyncExternalStore(glrb.sub, glrb.get, () => null)
        return glrb
}
