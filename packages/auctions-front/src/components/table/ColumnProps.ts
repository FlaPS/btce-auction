export type ColumnProps<T, K extends keyof T = any> = {
    title: string
    dataIndex: K
    render?: (value: T[K], record?: T, index?: number, column?: ColumnProps<T, K>) => any
    mapValue?: (value: T[K], record?: T, index?: number) => any
    width: string
    mapToSort?: (value: T[K], record?: T, index?: number) => string | number | boolean | BigInteger | undefined | null
    link?: (value: T[K], record?: T, index?: number) => string
}

export const columnsBuilder = <T, I extends keyof T = undefined>
    (cols: ColumnProps<T, I>[] = [], generator?: (index: number) => T) => ({
        add: <K extends keyof T> (col: ColumnProps<T, K>) =>
          columnsBuilder<T, K | I>([...cols, col] as any),

        columns: () => cols,
    })
