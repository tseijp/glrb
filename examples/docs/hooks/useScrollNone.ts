import { useState } from 'react'

export interface ScrollNoneRef<El extends HTMLElement> {
        (el: El | null): void
        current: El | null
}

const createScrollNone = <El extends HTMLElement>() => {
        let timeoutId: ReturnType<typeof setTimeout>
        let callback = () => {}

        const onWheel = (e: Event) => {
                e.preventDefault()
                ref.current!.style.pointerEvents = 'none'
                callback()
                timeoutId = setTimeout(() => {
                        ref.current!.style.pointerEvents = 'auto'
                }, 100)
                callback = () => clearTimeout(timeoutId)
        }

        const ref = ((el: El | null) => {
                if (el) {
                        ref.current = el
                        ref.current.addEventListener('wheel', onWheel, {
                                passive: false,
                        })
                } else ref.current?.removeEventListener('wheel', onWheel)
        }) as ScrollNoneRef<El>

        return ref
}

export const useScrollNone = () => {
        const [ref] = useState(createScrollNone)
        return ref
}
