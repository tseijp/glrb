import * as React from 'react'
import { gsap } from 'gsap'
import { useGestureEventStore } from '@site/hooks/useGestureEventStore'

export interface LandingContainerProps {
        children: React.ReactNode
}

const mix = (x = 0, y = 0, a = 0.5) => x * (1 - a) + y * a

export const LandingContainer = (props: LandingContainerProps) => {
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
                        dy,
                        y,
                } = state
                if (disable) return
                const background = `rgba(0, 0, 0, ${mix(0.03, 0.97, dy)})`
                if (isGestureStart) tl.to(el, { y, background, duration: 0.01 })
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
                                background: 'rgba(255, 255, 255, 0.03)',
                        }}
                >
                        {children}
                </div>
        )
}
