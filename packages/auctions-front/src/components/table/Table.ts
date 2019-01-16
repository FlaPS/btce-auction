import React from 'react'
import { styled } from '../../styles'
import { ColumnProps } from './ColumnProps'
import { TableHeaderRow } from './TableHeaderRow'
import { TableRow } from './TableRow'
import * as R from 'ramda'
import { Renderable, renderChildren } from '@sha/react-fp'
import { Spinner } from '../elements/Spinner'
import { PaginationExtended } from './PaginationExtended'
import { isArray } from '@sha/utils'
import { Pagination } from './Pagination'


const Layout = styled.div`
  .footer {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    min-height: 5.6em;
    padding-left: 2em;
    padding-right: 2em;
    background: #1E1E1E;
    border-radius: 0px 0px 0.5em 0.5em;
  }
`

export type TableProps<T> = {
  columns: ColumnProps<T, keyof T>[],
  data: T[],
  expandable?: boolean,
  expandedRowRender?: (record, index) => React.ReactNode,
  rowKey?: keyof T

  paginationConfig?: typeof defaultPaginationConfig
  paginationExtended?: boolean
  emptyContent?: Renderable<TableProps<T>>
  isLoading?: boolean
  maxRowsPerPage?: number
  footerChildren: Renderable[]
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
  maxPagesToShow: 6,
  maxRowsOptions: [10, 25, 50],
}


export const Table = <T>({
   columns,
   data,
   rowKey = columns[0].dataIndex,
   emptyContent,
   isLoading,
   expandedRowRender,
   paginationExtended = false,
   paginationConfig = defaultPaginationConfig,
                           footerChildren = [],
   ...props }: TableProps<T>) => {

  /// sorting
  const [sortState, setSortState] = React.useState({order: 'asc', columnIndex: -1} as any as SortState)

  let list = data
  if (sortState.columnIndex !== -1) {
    const column = columns[sortState.columnIndex]
    const getValue = column.mapToSort || ((value, record) => value)
    list = list.sort((a, b) => {
        const aValue = getValue(a[column.dataIndex], a)
        const bValue = getValue(b[column.dataIndex], b)
        if (aValue  === bValue)
          return 0
        return aValue > bValue ? 1 : -1
      },
    )
    if (sortState.order === 'desc')
      list = list.reverse()
  }


  // pagination
  const [startRow, setSelectedRow] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(paginationConfig.maxRowsOptions[0])



  const footer =
    React.createElement(
        'div',
        {className: 'footer', key: 'footer'},
        paginationExtended
          ? React.createElement(
            PaginationExtended,
            {
              rowsPerPageOptions: paginationConfig.maxRowsOptions,
              rowsPerPage,
              value: startRow,
              onValueChange: setSelectedRow,
              onRowsPerPageChange: setRowsPerPage,
              totalRows: list.length,
              maxPagesToShow: paginationConfig.maxPagesToShow,
            },
          )
          : footerChildren.concat(
              React.createElement(
                Pagination,
                {
                  key: 'pagination',
                  rowsPerPage,
                  value: startRow,
                  onValueChange: setSelectedRow,
                  totalRows: list.length,
                  maxPagesToShow: paginationConfig.maxPagesToShow,
                },
              ),
            ),
    )

  list = R.slice(startRow, startRow + rowsPerPage, list)

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


  const renderRow = (record, index) =>
    React.createElement(TableRow, { record, index, columns, key: record[rowKey] || index})

  let rows = isLoading
    ? React.createElement(Spinner, {key: 'spinner'})
    : (list && list.length)
                ? list.map(renderRow)
                : renderChildren(emptyContent)
  rows = isArray(rows) ? rows : [rows]
  return (
    React.createElement(
      TableContext.Provider,
      {value: api},
      [
        React.createElement(Layout, {key: 'layout'}, [
          header,
          ...rows,
          footer,
        ]),
      ],
    )
  )
}

