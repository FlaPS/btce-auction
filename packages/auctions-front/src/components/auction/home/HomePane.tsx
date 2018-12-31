import React from 'react'
import { ColumnProps } from '../../table/ColumnProps'
import * as random from '@sha/random'
import { DAY_MILIS } from '@sha/utils'
import {times} from 'ramda'
import { Table } from '../../table/Table'
import { styled } from '../../../styles'

const getAuctionRow = (index: number) =>
  ({
    name: random.faker.company.companyName(),
    suffix: random.faker.company.companySuffix(),
    ask: (Math.random() * 100).toFixed(2),
    bestBid: (Math.random() * 200).toFixed(2),
    bestBidPercent: (Math.random() * 100).toFixed(2),
    timeRemaining: Math.random() * DAY_MILIS * 20,
    dislikes: random.randomNatural(200),
    publishedOn: random.faker.date.recent(10).getTime(),
  })

type AuctionRow = ReturnType<typeof getAuctionRow>

const columns: ColumnProps<AuctionRow, any> = [
  {
    title: 'name',
    dataIndex: 'name',
    width: '18em',
  },
  {
    title: 'suffix',
    dataIndex: 'suffix',
    width: '7em',
    mapValue: value => '.' + value,
  },
  {
    title: 'ask',
    dataIndex: 'ask',
    width: '12em',
  },
  {
    title: 'best bid',
    dataIndex: 'bestBid',
    width: 'calc((100% - 40em)/ 2',
  },
  {
    title: 'best bid%',
    dataIndex: 'bestBidPercent',
    width: 'calc((100% - 40em)/ 2',
  },
  {
    title: 'time remaining',
    dataIndex: 'timeRemaining',
    width: '12em',
  },
  {
    title: 'dislikes',
    dataIndex: 'dislikes',
    width: '8em',
  },
  {
    title: 'published on',
    dataIndex: 'publishedOn',
    width: '7em',
  },
]

const mock = times(getAuctionRow, 40)

const BodyLayout = styled.div`
   background-color: #191919;
  border-radius: 0 0 6px 6px;


`

export const HomePane = () =>
{
  return (  <div className='main-tab__wrap' >
              <div className='main-tab__head'>
                <span>Recent</span>
              </div>
              <BodyLayout>
                <Table data={mock} columns={columns}></Table>
              </BodyLayout>
            </div>
        )
}
