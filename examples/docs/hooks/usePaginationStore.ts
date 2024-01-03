import * as React from 'react'

export const PAGINATION_MIN = 0

export const PAGINATION_MAX = 5

export const PAGINATION_SIZE = PAGINATION_MAX - PAGINATION_MIN

const listeners = new Set<Fun<[next: number, prev: number], void>>()

const isF = <Args extends any[] = any[], Ret = void>(
        value: unknown
): value is Fun<Args, Ret> => typeof value === 'function'

type Fun<Args extends any[] = any[], Ret = void> = (...args: Args) => Ret

let page = 0

let prev = page

export const isPaginationDisable = (value: number | Fun<[number], number>) => {
        if (isF(value)) value = value(page)
        return value < PAGINATION_MIN || PAGINATION_MAX - 1 < value
}

const set = (value: number | Fun<[number], number>) => {
        if (isF(value)) value = value(page)
        if (isPaginationDisable(value)) return
        prev = page
        page = value
        listeners.forEach((f) => f(page, prev))
}

const subscribe = (callback: Fun) => {
        listeners.add(callback)
        return () => void listeners.delete(callback)
}

export const usePaginationStore = () => {
        React.useSyncExternalStore(subscribe, () => page)
        return [page, set]
}

export const usePaginationEffect = (callback: Fun) => {
        React.useEffect(() => subscribe(callback), [])
}
