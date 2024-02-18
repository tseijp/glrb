import * as React from 'react'
import { gsap } from 'gsap'
import { useColorMode } from '@docusaurus/theme-common'
import { useScrollEvent } from '@site/hooks/useScroll'
import { useOnce } from '@site/hooks/useOnce'

export interface LandingContainerProps {
        children: React.ReactNode
}

const mix = (x = 0, y = 0, a = 0.5) => x * (1 - a) + y * a

const exp = (x = 0, step = 5, scale = 1.5) => {
        x += step / 2
        x = x % step
        x -= step / 2
        x *= step / scale
        x *= x
        return Math.exp(-x)
}

const scrollY = (y = 0, h = 4000) => {
        y += h / 2
        y /= h
        y = Math.floor(y)
        y *= h
        y += window.innerHeight
        return y
}

export const LandingWrap = (props: LandingContainerProps) => {
        const { children } = props
        const tl = useOnce(() => gsap.timeline({ paused: true }))
        const tl2 = useOnce(() => gsap.timeline({ paused: true }))
        const ref = React.useRef<HTMLDivElement | null>(null)
        const isDark = useColorMode().colorMode === 'dark'

        const scroll = useScrollEvent((state) => {
                const { isScrolling, isScrollEnd, offset } = state
                const el = ref.current
                let [, y] = offset
                y = exp(y / window.innerHeight)

                const c = mix(isDark ? 28 : 255, 12, y * 1.2)
                const background = `rgba(${c}, ${c}, ${c})`

                // animate background
                tl.clear()
                if (isScrolling) tl.to(el, { background, duration: 0 })
                if (isScrollEnd) tl.to(el, { background })
                tl.play()
        })

        const onUpdate = () => {
                scroll._active = true
                scroll.active = true
                scroll.onScroll()
        }

        const onComplete = () => {
                scroll._active = false
                scroll.active = false
                scroll.target.scrollTop = window.innerHeight
        }

        const handleClick = () => {
                const { offset, threshold } = scroll
                let [, y] = offset
                let [, h] = threshold
                if (!h) h = scroll.target.scrollHeight - window.innerHeight
                y = scrollY(y, h)

                // animate scroll
                tl2.clear()
                tl2.to(scroll.offset, {
                        1: y,
                        duration: 1,
                        onUpdate,
                        onComplete,
                })
                tl2.play()
        }

        return (
                <div
                        ref={ref}
                        onClick={handleClick}
                        style={{
                                zIndex: 1,
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
