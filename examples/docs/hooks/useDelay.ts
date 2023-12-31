import { useOnce } from './useOnce'

export const createDelay = <
        T = <Args extends any[], Ret>(...args: Args) => Ret
>() => {
        let callback: T
        let listener = () => {}
        let ms = 1000
        let id = 0

        const delay = (...args: unknown[]) => {
                id = window.setTimeout(callback as Function, ms, ...args)
                listener()
                listener = () => window.clearTimeout(id)
        }

        const apply = (_callback: T, _ms: number) => {
                callback = _callback
                ms = _ms
        }

        return [delay, apply] as const
}

export const useDelay = <T = <Args extends any[], Ret>(...args: Args) => Ret>(
        callback: T,
        ms: number = 1000
) => {
        const [delay, apply] = useOnce(createDelay<T>)
        apply(callback, ms)
        return delay as T
}
