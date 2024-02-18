import * as React from 'react'
import { useWindowSize } from '@docusaurus/theme-common'

export interface WrapProps {
        children: React.ReactNode
}

export const CaseWrap = (props: WrapProps) => {
        const { children } = props
        const isMobile = useWindowSize() === 'mobile'

        return (
                <div
                        style={{
                                display: 'flex',
                                gap: isMobile ? '7.5%' : '10px',
                                width: '100vw',
                                height: '100vh',
                                overflow: 'hidden',
                                boxSizing: 'border-box',
                                flexDirection: isMobile ? 'column' : 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                        }}
                >
                        {children}
                </div>
        )
}
