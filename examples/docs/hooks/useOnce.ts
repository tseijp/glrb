import * as React from 'react'

export const useOnce = <T>(callback: () => T) => {
        const ref = React.useRef<T>()
        return ref.current ?? (ref.current = callback())
}
