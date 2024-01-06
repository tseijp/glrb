import * as React from 'react'

const fontSize = 'calc(20px + (100vw - 960px) / 200)'
const letterSpacing = `calc(1em * 0.2)`

export const H3 = ({ children }: { children: string }) => {
        return (
                <h3
                        style={{
                                boxSizing: 'border-box',
                                margin: `0 0 0 calc(3 * ${letterSpacing})`,
                                // text decoration
                                color: 'white',
                                lineHeight: '2',
                                letterSpacing,
                                fontSize,
                                fontFamily: `Freight, "serif"`,
                        }}
                >
                        {children}
                </h3>
        )
}
