import { Button, Drawer } from 'antd'
import React from 'react'

interface IProps {
    projectModalOpen: boolean
    onClose: () => void
}

export default function ProjectModal(props: IProps) {
    return (
        <Drawer onClose={props.onClose} width={'100%'} visible={props.projectModalOpen}>
            <h1>project modal</h1>
            <Button onClick={props.onClose}>关闭</Button>
        </Drawer>
    )
}
