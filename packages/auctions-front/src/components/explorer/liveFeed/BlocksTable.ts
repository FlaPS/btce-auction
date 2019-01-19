import React from 'react'
import styled from '../../../styles'
import { ExplorerTable } from '../ExplorerTable'
import { ColumnProps, columnsBuilder } from '../../table/ColumnProps'
import { BlockRow } from '../../../store/api/explorer/blocks'
import moment from 'moment'
import { FrontState } from '../../../store/reducer'
import { EOSPlorerBaseURL } from '../../../store/api/http'
import { TableProps } from '../../table/Table'
import { useMappedState } from '../../../hooks'

type BlockItem = BlockRow & {producer: string}

const blockColumns = columnsBuilder<BlockItem>()
  .add(
  {
    title: 'block',
    dataIndex: 'block_num',
    width: '20%',
    link: (value, record: BlockItem) => EOSPlorerBaseURL + 'blocks/' + record.block_id,
  })
  .add( {
    title: 'Date/time',
    dataIndex: 'createdAt',
    mapValue: value => moment(value).format('DD.MM.YYYY, hh:mm:ss'),
    width: '20%',
  })
  .add(
  {
    title: 'Producer',
    dataIndex: 'producer',
    width: '20%',
  })
  .add(
  {
    title: 'TXNS',
    dataIndex: 'num_transactions',
    width: '20%',
  })
  .add({
    title: 'actions',
    dataIndex: 'num_actions',
    width: '20%',
  })
  .columns()


const selector = (state: FrontState) => (
  {
    ...state.app.explorer.blocks,
    value: state.app.explorer.blocks.value
      ? state.app.explorer.blocks.value.map(block => ({...block, producer: block.block.producer}))
      : [],
  }
)




export const BlocksTable = <T>(props: Partial<TableProps<T>>) => {

  return React.createElement(
    ExplorerTable,
    {
      columns: blockColumns,
      state: useMappedState(selector),
      paginationConfig: {
        maxPagesToShow: 6,
        maxRowsOptions: [6],
      },
      ...props,
    },
  )
}
