import * as React from 'react'
import { Head } from '@site/ui/Head'
import { Main } from '@site/ui/Main'
import { H1 } from '@site/ui/cases/H1'
import { LandingContainer } from '@site/ui/landing/Container'
import { CasesContainer } from '@site/ui/cases/Container'
import { useGLRB } from '@site/hooks/useGLRB'
import { useForm } from '@site/hooks/useForm'
import { useDelay } from '@site/hooks/useDelay'
import Layout from '@theme/Layout'

const FRAG = `
x = gl.FragCoord.x / gl.w
y = gl.FragCoord.y / gl.h
col = vec x, y, 0.0, 1.0
gl.FragColor = col
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
                                        <canvas ref={glrb.ref} />
                                        <textarea
                                                style={{
                                                        marginLeft: '64px',
                                                        background: 'none',
                                                        resize: 'none',
                                                        border: 'none',
                                                        outline: 'none',
                                                        width: '256px',
                                                        height: '256px',
                                                }}
                                                defaultValue={FRAG}
                                                ref={form.ref}
                                        />
                                </CasesContainer>
                        </Main>
                </Layout>
        )
}
