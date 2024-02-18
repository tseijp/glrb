import * as React from 'react'
import { useGLRB } from '@site/hooks/useGLRB'
import { useForm } from '@site/hooks/useForm'
import { useDelay } from '@site/hooks/useDelay'
import { useWindowSize } from '@docusaurus/theme-common'
import { CaseInput } from './CaseInput'
import { CaseWrap } from './CaseWrap'
import { CaseH3 } from './CaseH3'

export interface CaseProps {
        // children: React.ReactNode
        title: string
        frag: string
}

export const Case = (props: CaseProps) => {
        const { frag } = props
        const isMobile = useWindowSize() === 'mobile'

        const delay = useDelay((e) => glrb.set(e.target.value))
        const form = useForm(delay)
        const glrb = useGLRB()

        return (
                <CaseWrap>
                        <canvas ref={glrb.ref} />
                        <div
                                style={{
                                        width: isMobile ? '85%' : '23vw',
                                        marginTop: '2rem',
                                        marginLeft: '2rem',
                                        boxSizing: 'border-box',
                                }}
                        >
                                <CaseH3>Basic Example</CaseH3>
                                <CaseInput defaultValue={frag} ref={form.ref} />
                        </div>
                </CaseWrap>
        )
}
