import * as React from 'react'

export interface CaseInputProps {
        defaultValue: string
}

export const CaseInput = React.forwardRef<HTMLTextAreaElement, CaseInputProps>(
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
                                        maxWidth: '80vw',
                                        maxHeight: '100%',
                                        color: 'rgba(21, 21, 21)',
                                }}
                                defaultValue={defaultValue}
                        />
                )
        }
)
