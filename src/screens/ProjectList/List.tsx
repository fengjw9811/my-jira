import { Table } from 'antd'
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
        <Table
            pagination={false}
            columns={[
                {
                    title: '名称',
                    dataIndex: 'name',
                    sorter: (a, b) => a.name.localeCompare(b.name)
                },
                {
                    title: '负责人',
                    render(value, project) {
                        return <span>{users.find((user) => user.id === project.personId)?.name || '未知'}</span>
                    }
                }
            ]}
            dataSource={list}
        ></Table>
    )
}
