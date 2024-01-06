import * as React from 'react'
import { useGLRB } from '@site/hooks/useGLRB'
import { useForm } from '@site/hooks/useForm'
import { useDelay } from '@site/hooks/useDelay'

export interface DemoProps {
        // children: React.ReactNode
        frag: string
}

export const Demo = (props: DemoProps) => {
        const { frag } = props

        const delay = useDelay((e) => glrb.set(e.target.value))
        const form = useForm(delay)
        const glrb = useGLRB()

        return (
                <div
                        style={{
                                minHeight: '100vh',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                // background: 'red', // !!!!!!!
                        }}
                >
                        <canvas ref={glrb.ref} />
                        <textarea
                                style={{
                                        marginLeft: '64px',
                                        background: 'none',
                                        color: 'rgba(21, 21, 21)',
                                        resize: 'none',
                                        border: 'none',
                                        outline: 'none',
                                        width: '256px',
                                        height: '256px',
                                }}
                                defaultValue={frag}
                                ref={form.ref}
                        />
                </div>
        )
}
