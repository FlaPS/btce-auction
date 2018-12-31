import React from 'react'
import { styled } from '../../styles'
import { ColumnProps } from './ColumnProps'
import { TableCell } from './TableCell'

const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 4.5em;
  align-items: center;
`


export const TableRow = <T>({columns, index, record}: {columns: ColumnProps<T, any>[], record: T, index: number}) =>
  React.createElement(Layout, {},[
    // @ts-ignore
  columns.map( col => React.createElement(TableCell, {index, record, column: col}))
])
