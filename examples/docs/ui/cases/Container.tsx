import * as React from 'react'
import { gsap } from 'gsap'
import { useGestureEventStore } from '@site/hooks/useGestureEventStore'

export interface WrapProps {
        children: React.ReactNode
}

export const CasesContainer = (props: WrapProps) => {
        const { children } = props
        const tl = React.useMemo(() => gsap.timeline(), [])
        const ref = React.useRef<HTMLDivElement | null>(null)

        const { onClick } = useGestureEventStore((state) => {
                const el = ref.current
                const {
                        disable,
                        isGestureStart,
                        isGestureing,
                        isGestureEnd,
                        y,
                } = state
                if (disable) return
                if (isGestureStart) tl.to(el, { y, duration: 0.01 })
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
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: '#rgba(255, 255, 255, 0.97)',
                        }}
                >
                        {children}
                </div>
        )
}
