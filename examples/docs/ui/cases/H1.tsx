import * as React from 'react'

export const H1 = ({ children }: { children: string }) => {
        return (
                <h1
                        style={{
                                margin: 'auto',
                        }}
                >
                        {children}
                </h1>
        )
}
