import * as React from 'react'
import { useColorMode } from '@docusaurus/theme-common'

export interface CaseTitleProps {
        children: React.ReactNode
}

const fontSize = 'calc(30px + (100vw - 960px) / 400)'
const letterSpacing = `calc(1em * 0.1)`

export const CaseH3 = (props: CaseTitleProps) => {
        const { children } = props
        const isDark = useColorMode().colorMode === 'dark'
        return (
                <h3
                        style={{
                                lineHeight: '2',
                                letterSpacing,
                                fontSize,
                                color: isDark ? 'white' : 'black',
                                width: '100%',
                                textWrap: 'nowrap',
                                fontFamily: `Freight, "serif"`,
                        }}
                >
                        {children}
                </h3>
        )
}
