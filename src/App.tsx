import { useAuth } from 'context/auth-context'
import React from 'react'
import { AuthticatedApp } from 'authenticated-app'
import { UnauthenticatedApp } from 'unauthenticated-app'
import './App.css'
import { ErrorBoundary } from 'components/err-boundary'
import { FullPageErrorCallBack } from './components/lib'

function App() {
    const { user } = useAuth()
    return (
        <div className="App">
            <ErrorBoundary fallbackRender={FullPageErrorCallBack}>
                {user ? <AuthticatedApp /> : <UnauthenticatedApp />}
            </ErrorBoundary>
        </div>
    )
}

export default App
