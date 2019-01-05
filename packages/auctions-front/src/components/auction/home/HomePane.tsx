import React from 'react'
import { ColumnProps } from '../../table/ColumnProps'
import { now } from '@sha/utils'
import { Table } from '../../table/Table'
import { styled } from '../../../styles'
import moment from 'moment'
import { auctionDuck, AuctionRow } from '../../../store/btce/auction/auctionDuck'
import { useMappedState } from '../../../hooks'
import { nav } from '../../../store'
import { history } from '../../../history'
import { DislikeCell } from './DislikeCell'
import { Caption, ExpandedRowLayout, Value } from '../../table/ExpandedRowLayout'

const NameCell = styled.div`
  cursor: pointer;
  a {
    font-size: 2.0em;
    color: #FFAE00;
  }
`

const columns: ColumnProps<AuctionRow> = [
  {
    title: 'name',
    dataIndex: 'name',
    width: '18em',
    render: (value, record) =>
      <NameCell>
        <a onClick={() => history.push(nav.auctionBuyName({fullName: record.name + '.' + record.suffix }))}>
          {record.name}
        </a>
      </NameCell>,
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
    mapValue: (value, record) =>
      (record.bestBid / record.ask * 100).toFixed(2) + '%',
  },
  {
    title: 'time remaining',
    dataIndex: 'timeRemaining',
    width: '16em',
    mapValue: value => moment(value).format('d') + ' days',
  },
  {
    title: 'dislikes',
    dataIndex: 'dislikes',
    width: '10em',
    render: (value, record) => DislikeCell(record),
  },
  {
    title: 'published on',
    dataIndex: 'publishedOn',
    width: '15em',
    mapValue: value => moment(value).format('MMM DD, YYYY'),
  },
]

const BodyLayout = styled.div`
   background-color: #191919;
  border-radius: 0 0 6px 6px;


`

export const HomePane = () => {
  return (  <div className='main-tab__wrap' >
              <div className='main-tab__head'>
                <span>Recent</span>
              </div>
              <BodyLayout>
                <Table
                  data={useMappedState(auctionDuck.selectors.auctionRows)}
                  columns={columns}
                  expandedRowRender={(record, index) =>
                    <ExpandedRowLayout>
                      <Caption>Length</Caption>
                      <Value>{record.name.length + record.suffix.length + 1}</Value>
                      <Caption>Number of bids</Caption>
                      <Value>Unknown</Value>
                      <Caption>Time elapsed</Caption>
                      <Value>{moment(now() - record.publishedOn).format('d h')}</Value>
                      {
                        record.message && [
                              <Caption>Message</Caption>,
                              <Value>{record.message}</Value>,
                          ]
                      }
                    </ExpandedRowLayout>
                  }
                >

                </Table>
              </BodyLayout>
            </div>
        )
}
