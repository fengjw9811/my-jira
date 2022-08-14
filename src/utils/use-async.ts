import { useCallback, useReducer, useState } from 'react'
import { useMountedRef } from 'utils'

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

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
    const mountedRef = useMountedRef()

    return useCallback((...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0), [dispatch, mountedRef])
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = { ...defaultConfig, ...initialConfig }
    const [state, dispatch] = useReducer((state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }), {
        ...defaultInitailState,
        ...initialState
    })
    const safeDispatch = useSafeDispatch(dispatch)
    const [retry, setRetry] = useState(() => () => {})

    const setData = useCallback(
        (data: D) =>
            safeDispatch({
                data,
                status: 'success',
                error: null
            }),
        [safeDispatch]
    )

    const setError = useCallback(
        (error: Error) =>
            safeDispatch({
                error,
                status: 'error',
                data: null
            }),
        [safeDispatch]
    )

    //run用来触发异步请求
    const run = useCallback(
        (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
            if (!promise || !promise.then) {
                throw new Error('请传入 Promise 类型数据')
            }
            setRetry(() => () => {
                if (runConfig?.retry) {
                    run(runConfig?.retry(), runConfig)
                }
            })
            safeDispatch({ status: 'loading' })
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
        },
        [config.throwOnError, setData, setError, safeDispatch]
    )

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
