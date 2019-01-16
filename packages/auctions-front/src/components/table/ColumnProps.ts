export type ColumnProps<T, K extends keyof T = undefined> = {
    title: string
    dataIndex: K
    render?: (value: T[K], record?: T, index?: number, column?: ColumnProps<T, K>) => any
    mapValue?: (value: T[K], record?: T, index?: number) => any
    width: string
    mapToSort?: (value: T[K], record?: T, index?: number) => string | number | boolean | BigInteger | undefined | null
    link: (value: T[K], record?: T, index?: number) => string
}
