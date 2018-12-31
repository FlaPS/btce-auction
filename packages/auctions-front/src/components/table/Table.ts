import React from 'react'
import { styled } from '../../styles'
import { ColumnProps } from './ColumnProps'
import { TableHeaderRow } from './TableHeaderRow'
import { TableRow } from './TableRow'
import * as R from 'ramda'


const Layout = styled.div`
  padding-bottom: 2em;
`

export type TableProps<T> = {
  columns: ColumnProps<T, keyof T>[],
  data: T[],
  expandable?: boolean,
  expandedRowRender?: (record, index) => React.ReactNode,
  rowKey?: keyof T
}

export const TableContext = React.createContext({
  expandedKeys: [],
  toggleKeyExpand: (key: any) => [],
  expandedRowRender: (record, index) => JSON.stringify(record),
  rowKey: 'id'
})

export const Table = <T>({columns, data, rowKey = columns[0].dataIndex, expandedRowRender, ...props }: TableProps<T>) => {
  const [expandedKeys, setExpandedKeys] = React.useState([] as any as  any[])
  const api = {
    expandedKeys,
    toggleKeyExpand: key =>
      setExpandedKeys(expandedKeys.includes(key)
        ? R.remove(expandedKeys.indexOf(key), 1, expandedKeys)
        : [...expandedKeys, key]),
    expandedRowRender,
    rowKey,
  }

  return (
    React.createElement(TableContext.Provider, {value: api}, [
              React.createElement(Layout, {}, [
                React.createElement(TableHeaderRow, { columns, isExpandable: expandedRowRender !== undefined }),
                ...data.map((record, index) =>
                  React.createElement(TableRow, { record, index, columns})//, expandedRowRender: expandedKeys[record[rowKey]] && expandedRowRender })
                ),
              ])
      ]
    )
  )
}

