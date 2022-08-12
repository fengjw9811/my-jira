import { useAuth } from 'context/auth-context'
import ProjectListScreen from 'screens/ProjectList'

export const AuthticatedApp = () => {
    const { logout } = useAuth()
    return (
        <div>
            <button onClick={logout}>登出</button>
            <ProjectListScreen></ProjectListScreen>
        </div>
    )
}
