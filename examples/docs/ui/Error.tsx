import * as React from 'react'

export interface ErrorProps {
        children: React.ReactNode
}

export const Error = (props: ErrorProps) => {
        return <div>{props.children}</div>
}
