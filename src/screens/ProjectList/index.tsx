import React, { useState, useEffect } from 'react'
import List from './List'
import SearchPanel from './SearchPanel'
import { cleanObject, useDebounce, useMount } from 'utils'
import { useHttp } from 'utils/http'

export default function ProjectListScreen() {
    const [users, setUsers] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param, 500)
    const [list, setList] = useState([])
    const client = useHttp()

    useEffect(() => {
        client('projects', { data: cleanObject(debouncedParam) }).then(setList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedParam])

    useMount(() => {
        client('users').then(setUsers)
    })
    return (
        <div>
            <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>
            <List list={list} users={users}></List>
        </div>
    )
}
