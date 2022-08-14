/* @jsxImportSource @emotion/react */
import { Form, Input, Select } from 'antd'
import UserSelect from 'components/UserSelect'
import { Project } from './List'

interface ISearchPanel {
    users: User[]
    param: Partial<Pick<Project, 'name' | 'personId'>>
    setParam: (param: ISearchPanel['param']) => void
}

export interface User {
    id: number
    name: string
    email: string
    title: string
    organization: string
    token: string
}

export default function SearchPanel({ param, setParam, users }: ISearchPanel) {
    return (
        <Form css={{ marginBottom: '2rem' }} layout="inline">
            <Form.Item>
                <Input
                    placeholder="项目名"
                    type="text"
                    value={param.name}
                    onChange={(e) =>
                        setParam({
                            ...param,
                            name: e.target.value
                        })
                    }
                />
            </Form.Item>
            <Form.Item>
                <UserSelect
                    defaultOptionName="负责人"
                    value={param.personId}
                    onChange={(value) => setParam({ ...param, personId: value })}
                />
            </Form.Item>
        </Form>
    )
}
