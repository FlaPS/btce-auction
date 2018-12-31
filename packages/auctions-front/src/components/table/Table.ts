import React from 'react'
import { styled } from '../../styles'
import { ColumnProps } from './ColumnProps'
import { TableHeaderRow } from './TableHeaderRow'
import { TableRow } from './TableRow'

const Layout = styled.div`

`

export type TableProps<T> = {
  columns: ColumnProps<T, keyof T>[],
  data: T[]
}

export const Table = <T>({columns, data }: TableProps<T>) =>
  React.createElement(Layout, {},[
      React.createElement(TableHeaderRow, {columns}),
      ...data.map( (record, index) =>
        React.createElement(TableRow, {record, index, columns})
      ),
  ])

