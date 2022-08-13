/* @jsxImportSource @emotion/react */
import { Form, Input, Select } from 'antd'

interface ISearchPanel {
    users: User[]
    param: {
        name: string
        personId: string
    }
    setParam: (param: ISearchPanel['param']) => void
}

export interface User {
    id: string
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
                <Select
                    value={param.personId}
                    onChange={(value) =>
                        setParam({
                            ...param,
                            personId: value
                        })
                    }
                >
                    <Select.Option value="">负责人</Select.Option>
                    {users.map((user) => (
                        <Select.Option value={user.id} key={user.id}>
                            {user.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </Form>
    )
}
