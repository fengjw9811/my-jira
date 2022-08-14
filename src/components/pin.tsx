import { Rate } from 'antd'
import React from 'react'

interface IProps extends React.ComponentProps<typeof Rate> {
    checked: boolean
    onCheckedChange?: (checked: boolean) => void
}

export default function Pin(props: IProps) {
    const { checked, onCheckedChange, ...restProps } = props
    return <Rate count={1} value={checked ? 1 : 0} onChange={(num) => onCheckedChange?.(!!num)} />
}
