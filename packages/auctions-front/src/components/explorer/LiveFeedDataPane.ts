import React from 'react'
import styled from '../../styles'
import { ExplorerTable } from './ExplorerTable'
import { ColumnProps } from '../table/ColumnProps'
import { BlockRow } from '../../store/api/explorer/blocks'
import moment from 'moment'
import { FrontState } from '../../store/reducer'
import { EOSPlorerBaseURL } from '../../store/api/http'

type BlockItem = BlockRow & {producer: string}

const blockColumns: ColumnProps<BlockItem, keyof BlockItem> = [
  {
    title: 'block',
    dataIndex: 'block_num',
    width: '20%',
    link: (value, record: BlockItem) => EOSPlorerBaseURL + 'blocks/' + record.block_id,
  },
  {
    title: 'Date/time',
    dataIndex: 'createdAt',
    mapValue: value => moment(value).format('DD.MM.YYYY, hh:mm:ss'),
    width: '20%',
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
  },
]

const selector = (state: FrontState) => (
  {
    ...state.app.explorer.blocks,
    value: state.app.explorer.blocks.value
      ? state.app.explorer.blocks.value.map(block => ({...block, producer: block.block.producer}))
      : [],
  }
)

export const LiveFeedDataPane = () => {

  return React.createElement(
    ExplorerTable,
    {
      columns: blockColumns,
      selector,
      paginationConfig: {
        maxPagesToShow: 6,
        maxRowsOptions: [6],
      },
    },
  )
}
