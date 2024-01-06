import * as React from 'react'

const fontSize = 'calc(20px + (100vw - 960px) / 200)'
const letterSpacing = `calc(1em * 0.4)`

export const H1 = ({ children }: { children: string }) => {
        return (
                <h1
                        style={{
                                boxSizing: 'border-box',
                                margin: '0 0 0 10%',
                                // text decoration
                                color: 'rgba(247, 247, 247)',
                                lineHeight: '2',
                                letterSpacing,
                                fontSize,
                                fontFamily: `Freight, "serif"`,
                        }}
                >
                        {children}
                </h1>
        )
}
