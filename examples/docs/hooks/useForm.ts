import { useOnce } from './useOnce'
import { useCall } from './useCall'

const clamp = (min: number, max: number, value: number) =>
        Math.min(Math.max(value, min), max)

const fitTextarea = (el: any) => {
        let w = window.innerWidth
        w = w * (w < 997 ? 0.85 : 0.3)
        let h = window.innerHeight
        el.style.width = 'auto'
        el.style.height = 'auto'
        el.style.width = clamp(100, w, el.scrollWidth + 100) + 'px'
        el.style.height = clamp(100, h, el.scrollHeight + 100) + 'px'
}

export const createForm = <
        El extends Element,
        T = <Args extends any[], Ret>(...args: Args) => Ret
>(
        callback: T
) => {
        let target: El | null = null

        const onKeydown = (e: KeyboardEvent) => {
                fitTextarea(target)
        }

        const ref = (el: El | null) => {
                target = el
                if (el) {
                        fitTextarea(el)
                        target?.addEventListener('change', callback as any)
                        target?.addEventListener('keydown', onKeydown)
                } else {
                        target?.removeEventListener('change', callback as any)
                        target?.removeEventListener('keydown', onKeydown)
                }
        }

        return {
                get target() {
                        return target
                },
                ref,
        }
}

export const useForm = <
        El extends Element,
        T = <Args extends any[], Ret>(...args: Args) => Ret
>(
        _callback: T
) => {
        const callback = useCall(_callback)
        const form = useOnce(() => createForm<El, T>(callback))
        return form
}
