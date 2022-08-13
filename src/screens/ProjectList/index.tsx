import React, { useState } from 'react'
import List from './List'
import SearchPanel from './SearchPanel'
import { useDebounce, useDocumentTitle } from 'utils'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useUrlQueryParam } from 'utils/url'

export default function ProjectListScreen() {
    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    const debouncedParam = useDebounce(param, 500)
    const { isLoading, error, data: list } = useProjects(debouncedParam)
    const { data: users } = useUsers()
    useDocumentTitle('项目列表', false)

    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel param={param} setParam={setParam} users={users || []}></SearchPanel>
            {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
            <List loading={isLoading} dataSource={list || []} users={users || []}></List>
        </Container>
    )
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
    padding: 3.2rem;
`
