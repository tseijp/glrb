import * as React from 'react'
// import * as Ruby from '@ruby/3.3-wasm-wasi'
import HeadImpl from '@docusaurus/Head'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

const code = `
require "js"

puts RUBY_VERSION # => Hello, world! (printed to the browser console)
# JS.global[:document].write "Hello, world!"
`

export const Head = () => {
        const { siteConfig } = useDocusaurusContext()
        return (
                <HeadImpl>
                        <title>
                                {siteConfig.title} {siteConfig.titleDelimiter}{' '}
                                {siteConfig.tagline}{' '}
                        </title>
                        {/* <script src="https://cdn.jsdelivr.net/npm/@ruby/3.3-wasm-wasi@2.4.1/dist/browser.script.iife.js"></script>
                        <script type="text/ruby">{code}</script> */}
                </HeadImpl>
        )
}
