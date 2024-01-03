import * as React from 'react'
import CodeBlock from '@theme/CodeBlock'
import { Head } from '@site/ui/Head'
import { Error } from '@site/ui/Error'
import { Main } from '@site/ui/Main'
import { H1 } from '@site/ui/cases/H1'
import { H3 } from '@site/ui/cases/H3'
import { LandingContainer } from '@site/ui/landing/Container'
import { CasesContainer } from '@site/ui/cases/Container'
import { useGLRB } from '@site/hooks/useGLRB'
import { useForm } from '@site/hooks/useForm'
import { useDelay } from '@site/hooks/useDelay'
import { Debug } from '@site/ui/landing/Debug'
import Layout from '@theme/Layout'

const FRAG = `
st = gl.FragCoord.xy / vec(gl.w, gl.h)
vec st.x, st.y, 0.0, 1.0
`.trim()

export default function Home(): JSX.Element {
        const delay = useDelay((e) => glrb.set(e.target.value))
        const form = useForm(delay)
        const glrb = useGLRB()

        return (
                <Layout noFooter>
                        <Head />
                        <Main>
                                {/* <Debug /> */}
                                <LandingContainer>
                                        <H1>GLRB OpenGL wrapper for Ruby</H1>
                                </LandingContainer>
                                <CasesContainer>
                                        <textarea
                                                defaultValue={FRAG}
                                                ref={form.ref}
                                        />
                                        <canvas ref={glrb.ref} />
                                </CasesContainer>
                        </Main>
                </Layout>
        )
}
