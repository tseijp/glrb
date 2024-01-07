import * as React from 'react'
import { gsap } from 'gsap'
import { useGestureEventStore } from '@site/hooks/useGestureEventStore'
import { useWindowSize } from '@docusaurus/theme-common'

export interface WrapProps {
        children: React.ReactNode
}

export const WrapCases = (props: WrapProps) => {
        const { children } = props
        const tl = React.useMemo(() => gsap.timeline(), [])
        const ref = React.useRef<HTMLDivElement | null>(null)
        const scrollRef = React.useRef<HTMLDivElement | null>(null)
        const isMobile = useWindowSize() === 'mobile'

        const { onClick } = useGestureEventStore((state) => {
                const el = ref.current
                const { isGestureing, isGestureEnd, y } = state
                if (isGestureing) tl.to(el, { y, duration: 0 })
                if (isGestureEnd) tl.to(el, { y })
                scrollRef.current?.scrollTo(0, 0)
        })

        return (
                <div
                        ref={ref}
                        onClick={onClick}
                        style={{
                                position: 'fixed',
                                top: '100vh',
                                width: '100vw',
                                height: '100vh',
                        }}
                >
                        <div
                                ref={scrollRef}
                                style={{
                                        height: '100%',
                                        position: 'relative',
                                        overflowY: 'scroll',
                                        paddingTop: '130px',
                                        paddingBottom: '130px',
                                        boxSizing: 'border-box',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                        gap: isMobile ? '7.5%' : '280px',
                                        flexDirection: 'row',
                                }}
                        >
                                {children}
                        </div>
                </div>
        )
}
