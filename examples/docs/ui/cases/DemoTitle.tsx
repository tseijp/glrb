import * as React from 'react'

export interface DemoTitleProps {
        children: React.ReactNode
}

const fontSize = 'calc(30px + (100vw - 960px) / 400)'
const letterSpacing = `calc(1em * 0.1)`

export const DemoTitle = (props: DemoTitleProps) => {
        const { children } = props
        return (
                <h3
                        style={{
                                lineHeight: '2',
                                letterSpacing,
                                fontSize,
                                color: 'black',
                                width: '100%',
                                textWrap: 'nowrap',
                                fontFamily: `Freight, "serif"`,
                        }}
                >
                        {children}
                </h3>
        )
}
