import { User } from './SearchPanel'

interface IList {
    list: Project[]
    users: User[]
}

interface Project {
    id: string
    name: string
    personId: string
    pin: boolean
    organization: string
}

export default function List({ list, users }: IList) {
    return (
        <table>
            <thead>
                <tr>
                    <th>名称</th>
                    <th>负责人</th>
                </tr>
            </thead>
            <tbody>
                {list.map((project) => (
                    <tr key={project.id}>
                        <td>{project.name}</td>
                        <td>{users.find((user) => user.id === project.personId)?.name || '未知'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
