import React, { ReactNode, useState } from 'react'
import * as auth from 'auth-provider'
import { User } from 'screens/ProjectList/SearchPanel'
import { http } from 'utils/http'
import { useMount } from 'utils'
import { useAsync } from 'utils/use-async'
import { FullPageErrorCallBack, FullPageLoading } from 'components/lib'

interface IAuthForm {
    username: string
    password: string
}

const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if (token) {
        const data = await http('me', { token })
        user = data.user
    }
    return user
}

const AuthContext = React.createContext<
    | {
          user: User | null
          login: (form: IAuthForm) => Promise<void>
          register: (form: IAuthForm) => Promise<void>
          logout: () => Promise<void>
      }
    | undefined
>(undefined)

AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { data: user, error, isLoading, isIdle, isError, run, setData: setUser } = useAsync<User | null>()

    //point free
    const login = (form: IAuthForm) => auth.login(form).then(setUser)
    const register = (form: IAuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => setUser(null))

    useMount(() => {
        run(bootstrapUser())
    })

    if (isIdle || isLoading) {
        return <FullPageLoading></FullPageLoading>
    }

    if (isError) {
        return <FullPageErrorCallBack error={error}></FullPageErrorCallBack>
    }

    return <AuthContext.Provider children={children} value={{ user, login, register, logout }}></AuthContext.Provider>
}

export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}
