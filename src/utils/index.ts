import { useState, useEffect } from 'react'

export const isFalsy = (value: any) => {
    return value === 0 ? false : !value
}

export const isVoid = (value: unknown) => {
    return value === undefined || value === null || value === ''
}

//清除对象的空属性
export const cleanObject = (object: { [key: string]: unknown }) => {
    const result = { ...object }
    Object.keys(result).forEach((key) => {
        const value = result[key]
        if (isVoid(value)) {
            delete result[key]
        }
    })
    return result
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export const useDebounce = <V>(value: V, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timeout)
    }, [value, delay])

    return debouncedValue
}
