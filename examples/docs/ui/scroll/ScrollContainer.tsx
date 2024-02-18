import * as React from 'react'
import { useScrollEvent } from '@site/hooks/useScroll'

export interface ScrollContainerProps {
        width?: number
        height?: number
}

export const ScrollContainer = (props: ScrollContainerProps) => {
        const { width = 1, height = 2 } = props

        const scroll = useScrollEvent((state) => {
                const { target } = state
                const { threshold, offset, value, isScrolling } = state
                if (!isScrolling) return

                const [, h] = threshold
                const [, x] = value

                // infinite scroll
                if (x >= h) {
                        offset[1] += h
                        target!.scrollTop = 1
                } else if (x <= 0 && offset[1] > h / 2) {
                        offset[1] -= h
                        target!.scrollTop = h - 1
                }
        })

        return (
                <div
                        ref={scroll.ref}
                        style={{
                                position: 'absolute',
                                top: '0px',
                                left: '0px',
                                width: '100%',
                                height: '100%',
                                overflow: 'auto',
                        }}
                >
                        <div
                                style={{
                                        width: `${width * 100}%`,
                                        height: `${height * 100}%`,
                                        pointerEvents: 'none',
                                }}
                        />
                        <div
                                style={{
                                        position: 'sticky',
                                        top: '0px',
                                        left: '0px',
                                        width: '100%',
                                        height: '100%',
                                        overflow: 'hidden',
                                }}
                        />
                </div>
        )
}
