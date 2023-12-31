import * as React from 'react'

export interface MainProps {
        children: React.ReactNode
}

export const Main = (props: MainProps) => {
        const { children } = props
        return (
                <div
                        style={{
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
