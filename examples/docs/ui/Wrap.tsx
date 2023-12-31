import * as React from 'react'

export interface WrapProps {
        children: React.ReactNode
}

export const Wrap = (props: WrapProps) => {
        const { children } = props
        return (
                <div
                        style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                        }}
                >
                        {children}
                </div>
        )
}
