import { useState } from 'react'

interface State<D> {
    error: Error | null
    data: D | null
    status: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitailState: State<null> = {
    status: 'idle',
    data: null,
    error: null
}

const defaultConfig = {
    throwOnError: false
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = { ...defaultConfig, ...initialConfig }
    const [state, setState] = useState<State<D>>({
        ...defaultInitailState,
        ...initialState
    })
    const [retry, setRetry] = useState(() => () => {})

    const setData = (data: D) =>
        setState({
            data,
            status: 'success',
            error: null
        })

    const setError = (error: Error) =>
        setState({
            error,
            status: 'error',
            data: null
        })

    //run用来触发异步请求
    const run = (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
        if (!promise || !promise.then) {
            throw new Error('请传入 Promise 类型数据')
        }
        setRetry(() => () => {
            if (runConfig?.retry) {
                run(runConfig?.retry(), runConfig)
            }
        })
        setState({ ...state, status: 'loading' })
        return promise
            .then((data) => {
                setData(data)
                return data
            })
            .catch((err) => {
                setError(err)
                if (config.throwOnError) return Promise.reject(err)
                return err
            })
    }

    return {
        isIdle: state.status === 'idle',
        isLoading: state.status === 'loading',
        isError: state.status === 'error',
        isSuccess: state.status === 'success',
        run,
        setData,
        setError,
        // retry被调用时重新跑一遍run
        retry,
        ...state
    }
}
