import * as React from 'react'
import Layout from '@theme/Layout'
import CodeBlock from '@theme/CodeBlock'
import { Head } from '@site/ui/Head'
import { Error } from '@site/ui/Error'
import { Main } from '@site/ui/Main'
import { H1 } from '@site/ui/H1'
import { H3 } from '@site/ui/H3'
import { Wrap } from '@site/ui/Wrap'
import { useGLRB } from '@site/hooks/useGLRB'
import { useForm } from '@site/hooks/useForm'
import { useDelay } from '@site/hooks/useDelay'

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
                                <H1>RLRB</H1>
                                <H3>
                                        🌁glrb is a simple OpenGL wrapper for
                                        Ruby
                                </H3>
                                <H3>Installation</H3>
                                <CodeBlock language="ruby">
                                        {'    '}gem i glrb{'    '}
                                </CodeBlock>
                                <H3>Example</H3>
                                <Error>{glrb.err}</Error>
                                <Wrap>
                                        <textarea
                                                defaultValue={FRAG}
                                                ref={form.ref}
                                        />
                                        <canvas ref={glrb.ref} />
                                </Wrap>
                        </Main>
                </Layout>
        )
}
