import { useOnce } from './useOnce'
import { useCall } from './useCall'

export const createForm = <
        El extends Element,
        T = <Args extends any[], Ret>(...args: Args) => Ret
>(
        callback: T
) => {
        let target: El | null = null
        const ref = (el: El | null) => {
                target = el
                if (el) target?.addEventListener('change', callback as any)
                else target?.removeEventListener('change', callback as any)
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
