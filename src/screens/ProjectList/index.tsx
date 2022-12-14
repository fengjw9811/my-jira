import List from './List'
import SearchPanel from './SearchPanel'
import { useDebounce, useDocumentTitle } from 'utils'
import styled from '@emotion/styled'
import { Button, Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useProjectsSearchParams } from './util'
import { Row } from 'components/lib'

export default function ProjectListScreen(props: { projectButton: JSX.Element }) {
    const [param, setParam] = useProjectsSearchParams()
    const { isLoading, error, data: list, retry } = useProjects(useDebounce(param, 500))
    const { data: users } = useUsers()
    useDocumentTitle('项目列表', false)

    return (
        <Container>
            <Row between={true}>
                <h1>项目列表</h1>
                {props.projectButton}
            </Row>
            <SearchPanel param={param} setParam={setParam} users={users || []}></SearchPanel>
            {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
            <List
                projectButton={props.projectButton}
                refresh={retry}
                loading={isLoading}
                dataSource={list || []}
                users={users || []}
            ></List>
        </Container>
    )
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
    padding: 3.2rem;
`
