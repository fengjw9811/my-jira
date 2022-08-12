import React, { useState, useEffect } from 'react'
import List from './List'
import SearchPanel from './SearchPanel'
import qs from 'qs'
import { cleanObject, useDebounce, useMount } from 'utils'

const apiUrl = process.env.REACT_APP_API_URL
export default function ProjectList() {
    const [users, setUsers] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param, 500)
    const [list, setList] = useState([])

    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async (res) => {
            if (res.ok) {
                setList(await res.json())
            }
        })
    }, [debouncedParam])

    useMount(() => {
        fetch(`${apiUrl}/users`).then(async (res) => {
            if (res.ok) {
                setUsers(await res.json())
            }
        })
    })
    return (
        <div>
            <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>
            <List list={list} users={users}></List>
        </div>
    )
}
