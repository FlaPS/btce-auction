import React from 'react'
import { Table, TableProps } from '../table/Table'
import { FrontState } from '../../store/reducer'
import { useMappedState } from '../../hooks'
import { AsyncState } from '@sha/fsa'
import { EmptyRows } from '../table/EmptyRows'
import { domeDuck } from '../../store/btce/dome/domeDuck'
import { history } from '../../history'
import { nav } from '../../store'

type ExplorerTableProps<T> =
  & TableProps<T>
  & {
    selector: (state: FrontState) => AsyncState<T[]>
  }

export const ExplorerTable = <T>({selector, ...props}: ExplorerTableProps<T>) => {
  const state = useMappedState(selector)
  const data = state.value

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
      isLoading: state.status === 'started',
      emptyContent,
    },
  )
}
