import { useAuth } from 'context/auth-context'
import React from 'react'
import { AuthticatedApp } from 'authenticated-app'
import { UnauthenticatedApp } from 'unauthenticated-app'
import './App.css'

function App() {
    const { user } = useAuth()
    return <div className="App">{user ? <AuthticatedApp /> : <UnauthenticatedApp />}</div>
}

export default App
