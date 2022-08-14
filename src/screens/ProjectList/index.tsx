import List from './List'
import SearchPanel from './SearchPanel'
import { useDebounce, useDocumentTitle } from 'utils'
import styled from '@emotion/styled'
import { Button, Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useProjectsSearchParams } from './util'

export default function ProjectListScreen() {
    const [param, setParam] = useProjectsSearchParams()
    const { isLoading, error, data: list, retry } = useProjects(useDebounce(param, 500))
    const { data: users } = useUsers()
    useDocumentTitle('项目列表', false)

    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel param={param} setParam={setParam} users={users || []}></SearchPanel>
            {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
            <List refresh={retry} loading={isLoading} dataSource={list || []} users={users || []}></List>
        </Container>
    )
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
    padding: 3.2rem;
`
