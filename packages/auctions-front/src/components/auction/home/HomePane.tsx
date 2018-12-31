import React from 'react'
import { ColumnProps } from '../../table/ColumnProps'
import * as random from '@sha/random'
import { DAY_MILIS, now } from '@sha/utils'
import {times} from 'ramda'
import { Table } from '../../table/Table'
import { styled } from '../../../styles'
import moment from 'moment'
import { AuctionRow } from '../../../store/btce/auctionDuck'
import { FrontState } from '../../../store/reducer'
import { useMappedState } from '../../../hooks'
import { nav } from '../../../store'
import { HistoryContext, NowContext, useSubscribe } from '../../../contexts'
import {history} from '../../../history'

const NameCell = styled.div`
  cursor: pointer;
  a {
    font-size: 2.0em;
    color: #FFAE00;
  }
`

const columns: ColumnProps<AuctionRow, any> = [
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
    render: (value) =>
      <div className='account-table_cell dislike'>
        <span className='dislike-value'>{value}</span>
        <svg width='15' height='13' viewBox='0 0 15 13' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M13.9609 1.77343C14.3984 2.21093 14.6992 2.73046 14.8633 3.33203C15.0273 3.93359 15.0273 4.53515 14.918 5.13671C14.7812 5.73828 14.5352 6.28515 14.1523 6.75L8.35546 12.7383C8.24609 12.8477 8.10937 12.875 7.97265 12.875C7.83593 12.875 7.72656 12.8477 7.64453 12.7383L1.84765 6.75C1.46484 6.28515 1.1914 5.73828 1.08202 5.13671C0.945304 4.53515 0.972648 3.93359 1.13671 3.33203C1.30077 2.73046 1.60155 2.21093 2.03905 1.77343L2.12109 1.6914C2.72265 1.06249 3.48827 0.707024 4.36327 0.652337C5.23828 0.597649 6.05859 0.816399 6.76953 1.30859L7.5625 3.68749L4.93749 5.4375L8.875 9.375L7.5625 5.875L10.1875 4.125L9.25781 1.30859C9.96875 0.816399 10.7617 0.597649 11.6367 0.652337C12.5117 0.707024 13.25 1.06249 13.8789 1.6914L13.9609 1.77343Z'/>
        </svg>
      </div>
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


const Value = styled.div`
  font-family: 'Brandon Grotesque';
  font-size: 1.3em;
  letter-spacing: 0.7px;
  text-transform: uppercase;
  color: #FFFFFF;
  white-space: nowrap;
  padding-right: 4em;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 20em;
`

const Caption = styled(Value)`
  opacity: 0.5;
   padding-right: 0.5em;
`

const ExpandedLayout = styled.div`
  height: 5.1em;
  border-bottom: 0.1em solid #FFAF02;
  display: flex;
  align-items: center;
  background-color:  #000000;
`

const selectRecentAuctions = (state: FrontState) => state.app.auction.auctions

export const HomePane = () => {
  return (  <div className='main-tab__wrap' >
              <div className='main-tab__head'>
                <span>Recent</span>
              </div>
              <BodyLayout>
                <Table
                  data={useMappedState(selectRecentAuctions)}
                  columns={columns}
                  expandedRowRender={(record, index) =>
                    <ExpandedLayout>
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
                    </ExpandedLayout>
                  }
                >

                </Table>
              </BodyLayout>
            </div>
        )
}
