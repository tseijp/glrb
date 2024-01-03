import * as React from 'react'
import { gsap } from 'gsap'
import { useGestureEventStore } from '@site/hooks/useGestureEventStore'

export interface LandingContainerProps {
        children: React.ReactNode
}

export const LandingContainer = (props: LandingContainerProps) => {
        const { children } = props
        const tl = React.useMemo(() => gsap.timeline(), [])
        const ref = React.useRef<HTMLDivElement | null>(null)

        useGestureEventStore(({ isGestureing, isGestureEnd, y }) => {
                if (isGestureing) {
                        tl.to(ref.current, { y: -y, duration: 0 })
                }
                if (isGestureEnd) {
                        tl.to(ref.current, { y: -y, duration: 0.5 })
                }
        })

        return (
                <div
                        ref={ref}
                        style={{
                                position: 'fixed',
                                top: 0,
                                color: '#fff',
                                width: '100vw',
                                height: '100vh',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxSizing: 'border-box',
                                background: '#0C0C0C',
                        }}
                >
                        {children}
                </div>
        )
}
