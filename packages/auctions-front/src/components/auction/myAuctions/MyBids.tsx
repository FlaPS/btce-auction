import React from 'react'
import styled from '../../../styles'
import { ColumnProps } from '../../table/ColumnProps'
import { domeDuck, AuctionRow } from '../../../store/btce/dome/domeDuck'
import { history } from '../../../history'
import { nav } from '../../../store'
import moment from 'moment'
import { FrontState } from '../../../store/reducer'
import { useMappedState } from '../../../hooks'
import { Table } from '../../table/Table'
import { GoldButtonCell } from '../../table/GoldButtonCell'
import { Caption, ExpandedRowLayout, Value } from '../../table/ExpandedRowLayout'
import { now } from '@sha/utils'
import { DislikeCell } from '../home/DislikeCell'
import { HistoryContext, useSubscribe } from '../../../contexts'
import { EmptyRows } from '../../table/EmptyRows'
import { compose, constant } from 'lazy-compose/src/index'
import { connect } from 'react-redux'
import { scatterDuck } from '../../../store/btce/scatter/scatterDuck'


const MyBidsRaw = ({isLoading, myBids, scatterIsConnected, myError, auctionsError, dispatch}) => {
  const state = useMappedState(selectAuctionsWithMyBids)
  const hisotry = useSubscribe(HistoryContext)

  let empty =
    <EmptyRows
      text={'No bids found. '}
      actionText={'Create a new one'}
      onActionClick={() =>
        history.push(nav.auctionBuyName())
      }
    />

  if (!scatterIsConnected)
      empty =
        <EmptyRows
            text={'Scatter is not connected. '}
            actionText={'Connect one'}
            onActionClick={() =>
              dispatch(scatterDuck.actions.attach.started())
            }
        />

  if (auctionsError)
    empty =
      <EmptyRows
        text={'List of auctions fetch error. '}
        actionText={'Refetch one'}
        onActionClick={() =>
          dispatch(domeDuck.actions.fetchRecentAuctions.started())
        }
      />

  if (myError)
    empty =
      <EmptyRows
        text={'Account state error. '}
        actionText={'Refetch one'}
        onActionClick={() =>
          dispatch(domeDuck.actions.fetchMyState.started())
        }
      />

  return  (
    <Table
      rowKey={'id'}
      isLoading={isLoading}
      columns={columns}
      data={myBids}
      emptyContent={empty}
      expandedRowRender={MyAuctionsExpandedRowRender}
    />
  )
}
const selectAuctionsWithMyBids = (state: FrontState) => {
  if  (state.app.auction.my.status){

  }

  const myBids = (state.app.auction.my.value  && state.app.auction.my.value.bids) || []
  const auctions = (domeDuck.selectors.auctionRows(state) || []).filter(item =>
    myBids.find( bid => bid.auctionId === item.id),
  )
  const auctionsError = state.app.auction.auctions.error
  const myError = state.app.auction.my.error
  return {
    auctionsError,
    myError,
    scatterIsConnected: state.app.scatter.attached,
    isLoading: state.app.auction.auctions.status === 'started' || state.app.auction.my.status === 'started',
    myBids: auctions.map(item => ({...item, bidAmount: myBids.find(bid => bid.auctionId === item.id).bidAmount})),
  }
}

export const MyBids = connect(selectAuctionsWithMyBids, dispatch => ({dispatch}))(MyBidsRaw)

const NameCell = styled.div`
    font-size: 2.0em;
    color: #FFAE00;

`

const columns: ColumnProps<AuctionRow & {bidAmount: number}, any> = [
  {
    title: 'name',
    dataIndex: 'name',
    width: '18em',
    render: (value, record) =>
      <NameCell>
          {record.name}

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
    title: 'my bid',
    dataIndex: 'bidAmount',
    width: 'calc((100% - 56em)/ 3',
  },
  {
    title: 'best bid',
    dataIndex: 'bestBid',
    width: 'calc((100% - 56em)/ 3',
  },
  {
    title: 'best bid%',
    dataIndex: 'bestBidPercent',
    width: 'calc((100% - 56em)/ 3',
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
    title: 'published on',
    dataIndex: 'publishedOn',
    width: '15em',
    mapValue: value => moment(value).format('MMM DD, YYYY'),
  },
  {
    title: '',
    dataIndex: 'name',
    width: '10em',
    render: (value: string, record) =>
      <GoldButtonCell
        label={'BID'}
        onClick={() =>
          history.push(nav.auctionBuyName({ fullName: record.name + '_' + record.suffix}))
        }
      />,
  },
]

export const MyAuctionsExpandedRowRender =  (record: AuctionRow, index: number) =>
  <ExpandedRowLayout>
    <div>
      <Caption>Number of bidders</Caption>
      <Value>N/A</Value>
    </div>
    <div>
      <Caption>Length</Caption>
      <Value>{(record.name + '.' + record.suffix).length}</Value>
    </div>
    {
      record.message && [
        <div key={'message'}>
          <Caption>Message</Caption>
          <Value>{record.message}</Value>
        </div>,
      ]
    }

    <div>
      <Caption>Dislikes</Caption>
      {DislikeCell(record)}
    </div>

    <div>
      <Caption>Time elapsed</Caption>
      <Value>{moment(now() - record.publishedOn).format('DD')}</Value>
    </div>

    <div>
      <Caption>Published on</Caption>
      <Value>{moment(record.publishedOn).format('YYYY MM DD')}</Value>
    </div>
  </ExpandedRowLayout>
