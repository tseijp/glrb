import { useOnce } from './useOnce'
import { useCall } from './useCall'

const fitTextarea = (el: any) => {
        el.style.width = 'auto'
        el.style.height = 'auto'
        el.style.width = el.scrollWidth + 100 + 'px'
        el.style.height = el.scrollHeight + 100 + 'px'
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
