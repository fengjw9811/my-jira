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
        <form action="">
            <div>
                <input
                    type="text"
                    value={param.name}
                    onChange={(e) =>
                        setParam({
                            ...param,
                            name: e.target.value
                        })
                    }
                />
                <select
                    value={param.personId}
                    onChange={(e) =>
                        setParam({
                            ...param,
                            personId: e.target.value
                        })
                    }
                >
                    <option value="">负责人</option>
                    {users.map((user) => (
                        <option value={user.id} key={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>
        </form>
    )
}
