import * as React from 'react'
import { useColorMode } from '@docusaurus/theme-common'

export interface CaseInputProps {
        defaultValue: string
}

export const CaseInput = React.forwardRef<HTMLTextAreaElement, CaseInputProps>(
        (props, forwardRef) => {
                const { defaultValue } = props
                const isDark = useColorMode().colorMode === 'dark'
                return (
                        <textarea
                                ref={forwardRef}
                                style={{
                                        background: 'none',
                                        overflow: 'hidden',
                                        resize: 'none',
                                        border: 'none',
                                        outline: 'none',
                                        textWrap: 'nowrap',
                                        whiteSpace: 'nowrap',
                                        width: 'auto',
                                        height: 'auto',
                                        maxWidth: '80vw',
                                        maxHeight: '100%',
                                        color: isDark
                                                ? 'rgb(200, 200, 200)'
                                                : 'rgba(20, 20, 20)',
                                }}
                                defaultValue={defaultValue}
                        />
                )
        }
)
