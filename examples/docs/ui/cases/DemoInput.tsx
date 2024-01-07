import * as React from 'react'

export interface DemoInputProps {
        defaultValue: string
}

export const DemoInput = React.forwardRef<HTMLTextAreaElement, DemoInputProps>(
        (props, forwardRef) => {
                const { defaultValue } = props
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
                                        maxWidth: '100vw',
                                        maxHeight: '100vh',
                                        color: 'rgba(21, 21, 21)',
                                }}
                                defaultValue={defaultValue}
                        />
                )
        }
)
