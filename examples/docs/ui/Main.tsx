import { Case } from './cases/Case'
import { Landing } from './landing/Landing'
import { ScrollContainer } from './scroll/ScrollContainer'
import { ScrollContent } from './scroll/ScrollContents'

const FRAG = `
x = gl.FragCoord.x / gl.w
y = gl.FragCoord.y / gl.h
col = vec x, y, 0.0, 1.0
gl.FragColor = col
`.trim()

export const Main = () => {
        const step = 5
        return (
                <main>
                        <ScrollContainer height={step} />
                        <ScrollContent index={0} step={step}>
                                <Landing />
                        </ScrollContent>
                        <ScrollContent index={1} step={step}>
                                <Case title="Basic Example" frag={FRAG} />
                        </ScrollContent>
                        <ScrollContent index={2} step={step}>
                                <Case title="Basic Example" frag={FRAG} />
                        </ScrollContent>
                        <ScrollContent index={3} step={step}>
                                <Case title="Basic Example" frag={FRAG} />
                        </ScrollContent>
                        <ScrollContent index={4} step={step}>
                                <Case title="Basic Example" frag={FRAG} />
                        </ScrollContent>
                </main>
        )
}
