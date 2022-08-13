import { Select } from 'antd'
import { Raw } from 'types'

type ISelect = React.ComponentProps<typeof Select>

interface IProps extends Omit<ISelect, 'value' | 'onChange' | 'defaultOptionName' | 'options'> {
    value: Raw | null | undefined
    onChange: (value?: number) => void
    defaultOptionName?: string
    options?: { name: string; id: number }[]
}

export default function IdSelect(props: IProps) {
    const { value, onChange, defaultOptionName, options, ...restProps } = props
    return (
        <Select value={toNumber(value)} onChange={(value) => onChange(toNumber(value) || undefined)} {...restProps}>
            {defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null}
            {options?.map((option) => (
                <Select.Option key={option.id} value={option.id}>
                    {option.name}
                </Select.Option>
            ))}
        </Select>
    )
}

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value))
