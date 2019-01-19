import React from 'react'
import styled from '../../../styles'
import { ExplorerTable } from '../ExplorerTable'
import { ColumnProps, columnsBuilder } from '../../table/ColumnProps'
import { BlockRow } from '../../../store/api/explorer/blocks'
import moment from 'moment'
import { FrontState } from '../../../store/reducer'
import { EOSPlorerBaseURL } from '../../../store/api/http'
import { TableProps } from '../../table/Table'
import { TransactionTraceRow } from '../../../store/api/explorer/transactions'
import { useMappedState } from '../../../hooks'

const transactionColumns = columnsBuilder<TransactionTraceRow>()
  .add({
    title: 'transaction id',
    dataIndex: 'id',
    width: '30%',
    link: value => EOSPlorerBaseURL + 'transactions/' + value,
  })
  .add({
    title: 'block number',
    dataIndex: 'block_num',
    width: '10%',
    link: (value, record) => EOSPlorerBaseURL + 'blocks/' + record.producer_block_id,
  })
  .add({
    title: 'timestamp',
    dataIndex: 'createdAt',
    width: '20%',
  })
  .add({
    title: 'action',
    dataIndex: 'action_traces',
    width: '40%',
  }).columns()
/*,
  {
    title: 'block number',
    dataIndex: 'createdAt',
    mapValue: value => moment(value).format('DD.MM.YYYY, hh:mm:ss'),
    width: '15%',
  },
  {
    title: 'Producer',
    dataIndex: 'producer',
    width: '20%',
  },
  {
    title: 'TXNS',
    dataIndex: 'num_transactions',
    width: '20%',
  },
  {
    title: 'actions',
    dataIndex: 'num_actions',
    width: '20%',
  },*/


const selector = (state: FrontState) => (
  {
    ...state.app.explorer.transactionTraces,
    value: state.app.explorer.transactionTraces.value || [],
  }
)

export const TransactionTracesTable = <T>(props: Partial<TableProps<T>>) => {

  return React.createElement(
    ExplorerTable as React.ComponentType<TableProps<TransactionTraceRow>>,
    {
      columns: transactionColumns,
      state: useMappedState(selector),
      paginationConfig: {
        maxPagesToShow: 6,
        maxRowsOptions: [6],
      },
      ...props,
    },
  )
}
