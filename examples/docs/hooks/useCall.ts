import * as React from 'react'

export const useCall = <T = <Args extends any[], Ret>(...args: Args) => Ret>(
        callback: T
) => {
        const ref = React.useRef((...args: unknown[]) => {
                return ref.cache(...args)
        }) as any

        ref.cache = callback

        return callback // ref.current as T
}
