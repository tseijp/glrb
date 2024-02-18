import React from 'react'
import { gsap } from 'gsap'
import { useLayoutEffect } from 'react'
import { useScrollEvent } from '@site/hooks/useScroll'
import { useOnce } from '@site/hooks/useOnce'
import { useScrollNone } from '@site/hooks/useScrollNone'

export interface ScrollCanvasProps {
        transform?: number
        index?: number
        step?: number
        size?: number
        children?: React.ReactNode
}

// const col = () => '#' + ((Math.random() * (1 << 24)) << 0).toString(16)

const clamp = (x = 0, y = 4000) => {
        return ((x + y / 2) % y) - y / 2
}

const stepPosition = (x = 0, index = 0, step = 5, size = 800) => {
        return clamp(x - index * size, step * size)
}

export const ScrollContent = (props: ScrollCanvasProps) => {
        const { children, index, step } = props
        const ref = useScrollNone()
        const tl = useOnce(() => gsap.timeline({ paused: true }))

        useScrollEvent((state) => {
                const { offset, isScrolling } = state
                const height = window.innerHeight
                if (!isScrolling) return

                let [, y] = offset
                y = -stepPosition(y, index, step, height)

                // fix flicking bug
                const duration = y < -height || height < y ? 0 : 0.2

                // animate position
                tl.clear()
                tl.to(ref.current, { y, duration })
                tl.play()
        })

        // useLayoutEffect(() => {
        //         const height = window.innerHeight
        //         const y = -stepPosition(0, index, step, height)
        //         ref.current.style.transform = `translate(0, ${y}px)`
        // }, [])

        return (
                <div
                        ref={ref}
                        style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100vw',
                                height: '100vh',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                // background: col(),
                        }}
                >
                        {children}
                </div>
        )
}
