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

        const mount = () => {
                try {
                        gl.el = el
                        gl.gl = el.getContext('webgl2', opt)
                        gl.init()
                        gl.resize({} as any, 256, 256)
                        gl.render()
                        gl.clear()
                        gl.viewport()
                        gl.drawArrays()
                } catch (e) {
                        console.warn((err = e))
                        update()
                }
        }

        const unmount = () => {
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
                        return err
                },
        }
}

export const useGLRB = (frag?: string) => {
        const glrb = useOnce(() => createGLRB(frag))
        React.useSyncExternalStore(glrb.sub, glrb.get, () => null)
        return glrb
}
