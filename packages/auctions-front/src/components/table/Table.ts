import React from 'react'
import { styled } from '../../styles'
import { ColumnProps } from './ColumnProps'
import { TableHeaderRow } from './TableHeaderRow'
import { TableRow } from './TableRow'
import * as R from 'ramda'


const Layout = styled.div`
  .footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    min-height: 5.6em;
    padding: 2em;
  }
  
`

export type TableProps<T> = {
  columns: ColumnProps<T, keyof T>[],
  data: T[],
  expandable?: boolean,
  expandedRowRender?: (record, index) => React.ReactNode,
  rowKey?: keyof T
  paginationConfig: {
    maxPagesToShow?: number

  }
  maxRowsPerPage?: number
}

export const TableContext = React.createContext({
  expandedKeys: [],
  toggleKeyExpand: (key: any) => [],
  expandedRowRender: (record, index) => JSON.stringify(record),
  rowKey: 'id',
})

export type SortState = {
  columnIndex: number
  order: 'asc' | 'desc'
}

const defaultPaginationConfig = {
  maxPagesToShow: 5,

}


export const Table = <T>({
   columns,
   data,
   rowKey = columns[0].dataIndex,
   expandedRowRender,
   paginationConfig = defaultPaginationConfig,
   maxRowsPerPage = 6, ...props }: TableProps<T>) => {

  /// sorting
  const [sortState, setSortState] = React.useState({order: 'asc', columnIndex: -1} as any as SortState)

  let list = data
  if(sortState.columnIndex !== -1) {
    const column = columns[sortState.columnIndex]
    const getValue = column.mapToSort || ((value, record) => value)
    list = list.sort((a, b) => {
        const aValue = getValue(a[column.dataIndex], a)
        const bValue = getValue(b[column.dataIndex], b)
        if (aValue  === bValue)
          return 0
        return aValue > bValue ? 1 : -1
      }
    )
    if (sortState.order === 'desc')
      list = list.reverse()
  }


  // pagination
  const [selectedPage, setSelectedPage] = React.useState(0)


  // Expanded keys
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

  const header = React.createElement(TableHeaderRow, { columns, isExpandable: expandedRowRender !== undefined, sortState, onSort: setSortState, key: 'header' })

  const rows = list.map((record, index) =>
    React.createElement(TableRow, { record, index, columns, key: index})//, expandedRowRender: expandedKeys[record[rowKey]] && expandedRowRender })
  )

  return (
    React.createElement(TableContext.Provider, {value: api},
      [
        React.createElement(Layout, {key: 'layout'}, [
          header,
          ...rows,
        ]),
      ],
    )
  )
}

