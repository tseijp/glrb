import * as React from 'react'
import { gsap } from 'gsap'
import { useGestureEventStore } from '@site/hooks/useGestureEventStore'

export interface LandingContainerProps {
        children: React.ReactNode
}

const mix = (x = 0, y = 0, a = 0.5) => x * (1 - a) + y * a

export const WrapLanding = (props: LandingContainerProps) => {
        const { children } = props
        const tl = React.useMemo(() => gsap.timeline(), [])
        const ref = React.useRef<HTMLDivElement | null>(null)

        const { onClick } = useGestureEventStore((state) => {
                const el = ref.current
                const { isGestureing, isGestureEnd, dy, y } = state
                const c = mix(12, 242, dy)
                const background = `rgba(${c}, ${c}, ${c})`
                if (isGestureing) tl.to(el, { y, background, duration: 0 })
                if (isGestureEnd) tl.to(el, { y, background })
        })

        return (
                <div
                        ref={ref}
                        onClick={onClick}
                        style={{
                                position: 'fixed',
                                top: 0,
                                color: '#fff',
                                width: '100vw',
                                height: '100vh',
                                display: 'flex',
                                alignItems: 'center',
                                boxSizing: 'border-box',
                                background: 'rgba(12, 12, 12)',
                        }}
                >
                        {children}
                </div>
        )
}
