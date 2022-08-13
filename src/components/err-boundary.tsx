import React, { Component } from 'react'

type FallbackRender = (props: { error: Error | null }) => React.ReactElement
type IProps = React.PropsWithChildren<{ fallbackRender: FallbackRender }>
interface IState {
    error: Error | null
}

export class ErrorBoundary extends Component<IProps, IState> {
    state = { error: null }

    static getDerivedStateFromError(error: Error) {
        return { error }
    }
    render() {
        const { error } = this.state
        const { fallbackRender, children } = this.props
        if (error) {
            return fallbackRender({ error })
        }
        return children
    }
}
