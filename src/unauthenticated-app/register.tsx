import { useAuth } from 'context/auth-context'
import { Form, Input } from 'antd'
import { LongButton } from 'unauthenticated-app'
import { useAsync } from 'utils/use-async'

export default function RegisterScreen({ onError }: { onError: (error: Error) => void }) {
    const { register } = useAuth()
    const { run, isLoading } = useAsync(undefined, { throwOnError: true })

    const handleSubmit = async ({
        confirmPassword,
        ...values
    }: {
        username: string
        password: string
        confirmPassword: string
    }) => {
        if (confirmPassword !== values.password) {
            onError(new Error('请确认两次输入的密码是否一致'))
            return
        }
        try {
            await run(register(values))
        } catch (err) {
            onError(err as Error)
        }
    }
    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name={'username'} rules={[{ required: true, message: '请输入用户名' }]}>
                <Input placeholder="用户名" type="text" id="username" />
            </Form.Item>
            <Form.Item name={'password'} rules={[{ required: true, message: '请输入密码' }]}>
                <Input placeholder="密码" type="password" id="password" />
            </Form.Item>
            <Form.Item name={'confirmPassword'} rules={[{ required: true, message: '请确认密码' }]}>
                <Input placeholder="确认密码" type="password" id="confirmPassword" />
            </Form.Item>
            <Form.Item>
                <LongButton loading={isLoading} htmlType="submit" type="primary">
                    注册
                </LongButton>
            </Form.Item>
        </Form>
    )
}
