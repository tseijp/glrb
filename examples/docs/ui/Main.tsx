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
                                height: '200vh',
                                display: 'flex',
                                boxSizing: 'border-box',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                overflow: 'visible',
                                background: 'rgba(247, 247, 247)',
                        }}
                >
                        {children}
                </main>
        )
}
