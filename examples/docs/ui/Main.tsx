import * as React from 'react'
import { useGestureEventStore } from '@site/hooks/useGestureEventStore'

export interface MainProps {
        children: React.ReactNode
}

export const Main = (props: MainProps) => {
        const { ref } = useGestureEventStore()

        const { children } = props

        return (
                <div
                        ref={ref}
                        style={{
                                minHeight: '200vh',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                        }}
                >
                        {children}
                </div>
        )
}
