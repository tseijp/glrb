import * as React from 'react'
import { useGestureEventStore } from '@site/hooks/useGestureEventStore'

export interface MainProps {
        children: React.ReactNode
}

export const Main = (props: MainProps) => {
        const { ref } = useGestureEventStore()
        const { children } = props

        return (
                <main
                        ref={ref}
                        style={{
                                width: '100vw',
                                height: '200vh',
                                maxWidth: '100vw',
                                overflow: 'hidden',
                                overflowX: 'hidden',
                                background: 'rgba(242, 242, 242)',
                        }}
                >
                        {children}
                </main>
        )
}
