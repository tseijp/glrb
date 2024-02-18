import { gsap } from 'gsap'
import { thresholdValue, useScrollEvent } from '@site/hooks/useScroll'
import * as React from 'react'

export interface LandingContainerProps {
        children: React.ReactNode
}

const mix = (x = 0, y = 0, a = 0.5) => x * (1 - a) + y * a

const exp = (x = 0, step = 5, scale = 2) => {
        x += step / 2
        x = x % step
        x -= step / 2
        x *= step / scale
        x *= x
        return Math.exp(-x)
}

export const LandingWrap = (props: LandingContainerProps) => {
        const { children } = props
        const tl = React.useMemo(() => gsap.timeline({ paused: true }), [])
        const ref = React.useRef<HTMLDivElement | null>(null)

        const scroll = useScrollEvent((state) => {
                const el = ref.current
                const { isScrolling, isScrollEnd, offset } = state
                let [, y] = offset
                const dy = exp(y / window.innerHeight)
                const c = mix(242, 12, dy * 1.2)
                const background = `rgba(${c}, ${c}, ${c})`
                tl.clear()
                if (isScrolling) tl.to(el, { background, duration: 0 })
                if (isScrollEnd) tl.to(el, { background })
                tl.play()
        })

        const handleClick = () => {
                const { target, offset, threshold } = scroll
                let [, y] = offset
                let [, h] = threshold
                if (!h) h = target.scrollHeight - window.innerHeight
                y += h / 2
                y /= h
                y = Math.floor(y)
                y *= h
                y += window.innerHeight

                const onUpdate = () => {
                        scroll._active = true
                        scroll.active = true
                        scroll.onScroll()
                }

                const onComplete = () => {
                        scroll._active = false
                        scroll.active = false
                        target.scrollTop = window.innerHeight
                }

                gsap.to(scroll.offset, {
                        1: y,
                        duration: 1,
                        onUpdate,
                        onComplete,
                })
        }

        return (
                <div
                        ref={ref}
                        onClick={handleClick}
                        style={{
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
