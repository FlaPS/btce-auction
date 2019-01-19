import React from 'react'
import { Table, TableProps } from '../table/Table'
import { FrontState } from '../../store/reducer'
import { useMappedState } from '../../hooks'
import { AsyncState } from '@sha/fsa'
import { EmptyRows } from '../table/EmptyRows'
import { domeDuck } from '../../store/btce/dome/domeDuck'
import { history } from '../../history'
import { nav } from '../../store'
import { SearchInput } from '../inputs/SearchInput'
import { ColumnProps } from '../table/ColumnProps'

type ExplorerTableProps<T> =
  & TableProps<T>
  & {
    state: AsyncState<T[]>
  }

export const ExplorerTable = <T>({state, footerChildren = [], ...props}: ExplorerTableProps<T>) => {
  let data = state.value || []

  const [search, setSearch] = React.useState('')

  if (search.length) {

    const searchResult = []
    for (let i = 0; i < data.length; i ++) {
      const obj = data[i]
      for (let c = 0; c < props.columns.length; c++) {
        const column = props.columns[c]
        let valueToCompare = String(obj[column.dataIndex])

        if (column.mapValue)
          valueToCompare = String(column.mapValue(obj[column.dataIndex], obj, i))

        const result = valueToCompare.includes(search)

        if (result) {
          searchResult.push(obj)
          break
        }
      }
    }

    data = searchResult
    console.log(data.length)
  }

  footerChildren = [
    React.createElement(SearchInput, {value: search, onValueChange: setSearch, key: 'key'}),
    ...footerChildren,
  ]
  const emptyContent = state.status === 'failed'
    ? React.createElement(
        EmptyRows,
        {
          text: state.error,
        },
    )
    : React.createElement(
        EmptyRows,
        {
          text: 'The list is empty',
        },
      )


  return React.createElement(
    Table,
    {
      ...props,
      data,
      footerChildren,
      isLoading: state.status === 'started',
      emptyContent,
    },
  )
}
