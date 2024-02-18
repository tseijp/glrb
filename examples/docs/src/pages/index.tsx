import * as React from 'react'
import { Head } from '@site/ui/Head'
import { Main } from '@site/ui/Main'
import Layout from '@theme/Layout'
import './style.css'

export default function Home(): JSX.Element {
        return (
                <Layout noFooter>
                        <Head />
                        <Main />
                </Layout>
        )
}
