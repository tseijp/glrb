import * as React from 'react'
import { gsap } from 'gsap'
import { useGestureEventStore } from '@site/hooks/useGestureEventStore'

export interface WrapProps {
        children: React.ReactNode
}

export const WrapCases = (props: WrapProps) => {
        const { children } = props
        const tl = React.useMemo(() => gsap.timeline(), [])
        const ref = React.useRef<HTMLDivElement | null>(null)

        const { onClick } = useGestureEventStore((state) => {
                const el = ref.current
                const { isGestureing, isGestureEnd, y } = state
                if (isGestureing) tl.to(el, { y, duration: 0 })
                if (isGestureEnd) tl.to(el, { y })
        })

        return (
                <div
                        ref={ref}
                        onClick={onClick}
                        style={{
                                position: 'fixed',
                                top: '100vh',
                                width: '100vw',
                                minHeight: '100vh',
                        }}
                >
                        <div style={{ height: '100%', position: 'relative' }}>
                                {children}
                        </div>
                </div>
        )
}
