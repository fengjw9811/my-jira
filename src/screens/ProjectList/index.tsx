import React, { useState } from 'react'
import List from './List'
import SearchPanel from './SearchPanel'
import { useDebounce } from 'utils'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'

export default function ProjectListScreen() {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param, 500)
    const { isLoading, error, data: list } = useProjects(debouncedParam)
    const { data: users } = useUsers()

    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel param={param} setParam={setParam} users={users || []}></SearchPanel>
            {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
            <List loading={isLoading} dataSource={list || []} users={users || []}></List>
        </Container>
    )
}

const Container = styled.div`
    padding: 3.2rem;
`
