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
                                top: '100vh',
                                width: '100vw',
                                minHeight: '100vh',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: '#F7F7F7',
                        }}
                >
                        {children}
                </div>
        )
}
