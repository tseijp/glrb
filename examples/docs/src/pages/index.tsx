import * as React from 'react'
import { Head } from '@site/ui/Head'
import { Main } from '@site/ui/Main'
import { H1 } from '@site/ui/landing/H1'
import { H3 } from '@site/ui/landing/H3'
import { WrapLanding } from '@site/ui/landing/WrapLanding'
import { WrapCases } from '@site/ui/cases/WrapCases'
import Layout from '@theme/Layout'
import { Demo } from '@site/ui/cases/Demo'
import './style.css'

const FRAG = `
x = gl.FragCoord.x / gl.w
y = gl.FragCoord.y / gl.h
col = vec x, y, 0.0, 1.0
gl.FragColor = col
`.trim()

export default function Home(): JSX.Element {
        return (
                <Layout noFooter>
                        <Head />
                        <Main>
                                {/* <img
                                        src="/img/202401071338.png"
                                        style={{
                                                top: 0,
                                                opacity: 0.5,
                                                width: '1280px',
                                                height: '800px',
                                                position: 'fixed',
                                        }}
                                /> */}
                                <WrapLanding>
                                        <H1>GLRB</H1>
                                        <H3>GLSL via Ruby</H3>
                                </WrapLanding>
                                <WrapCases>
                                        <Demo
                                                title="Basic Example"
                                                frag={FRAG}
                                        />
                                        <Demo
                                                title="Basic Example"
                                                frag={FRAG}
                                        />
                                        <Demo
                                                title="Basic Example"
                                                frag={FRAG}
                                        />
                                        <Demo
                                                title="Basic Example"
                                                frag={FRAG}
                                        />
                                        <Demo
                                                title="Basic Example"
                                                frag={FRAG}
                                        />
                                </WrapCases>
                        </Main>
                </Layout>
        )
}
