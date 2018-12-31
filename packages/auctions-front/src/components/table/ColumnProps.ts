export type ColumnProps<T = any, K extends keyof T = undefined> = {
    title: string
    dataIndex: K
    render?: (value: T[K], record?: T, index?: number) => any
    mapValue?: (value: T[K], record?: T, index?: number) => any
    width: string
}
