export type ColumnProps<T, K extends keyof T = undefined> ={
        render: (value: T[K], record?: T, index?: number, owner?: Table<T>)
    } 