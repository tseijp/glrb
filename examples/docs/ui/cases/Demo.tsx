import * as React from 'react'
import { useGLRB } from '@site/hooks/useGLRB'
import { useForm } from '@site/hooks/useForm'
import { useDelay } from '@site/hooks/useDelay'
import { DemoTitle } from './DemoTitle'
import { useWindowSize } from '@docusaurus/theme-common'
import { DemoInput } from './DemoInput'

export interface DemoProps {
        // children: React.ReactNode
        title: string
        frag: string
}

export const Demo = (props: DemoProps) => {
        const { frag } = props
        const isMobile = useWindowSize() === 'mobile'

        const delay = useDelay((e) => glrb.set(e.target.value))
        const form = useForm(delay)
        const glrb = useGLRB()

        return (
                <div>
                        <div
                                style={{
                                        display: 'flex',
                                        width: '100%',
                                        overflow: 'visible',
                                        flexDirection: isMobile
                                                ? 'column'
                                                : 'row',
                                }}
                        >
                                <canvas ref={glrb.ref} />
                                <div
                                        style={{
                                                width: isMobile
                                                        ? '85%'
                                                        : '23vw',
                                                marginTop: '7.5%',
                                                marginLeft: '7.5%',
                                                boxSizing: 'border-box',
                                        }}
                                >
                                        <DemoTitle>Basic Example</DemoTitle>
                                        <DemoInput
                                                defaultValue={frag}
                                                ref={form.ref}
                                        />
                                </div>
                        </div>
                </div>
        )
}
