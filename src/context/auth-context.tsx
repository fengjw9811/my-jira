import React, { useState } from 'react'
import * as auth from 'auth-provider'
import { User } from 'screens/ProjectList/SearchPanel'

interface IAuthForm {
    username: string
    password: string
}

const AuthContext = React.createContext(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = () => {
    const [user, setUser] = useState<User | null>(null)

    //point free
    const login = (form: IAuthForm) => auth.login(form).then(setUser)
    const register = (form: IAuthForm) => auth.login(form).then(setUser)
    const logout = () => auth.logout().then(() => setUser(null))

    return <AuthContext.Provider value={{ user, login, register, logout }}></AuthContext.Provider>
}
