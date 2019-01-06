import React from 'react'
import styled from '../../../styles'
import { ColumnProps } from '../../table/ColumnProps'
import { domeDuck, AuctionRow } from '../../../store/btce/dome/domeDuck'
import moment from '../home/HomePane'
import { FrontState } from '../../../store/reducer'
import { useDispatch, useMappedState } from '../../../hooks'
import { Table } from '../../table/Table'
import { MyAuctionsExpandedRowRender } from './MyBids'
import { GoldButtonCell } from '../../table/GoldButtonCell'
import { HistoryContext, useSubscribe } from '../../../contexts'
import { EmptyRows } from '../../table/EmptyRows'
import { history } from '../../../history'
import { nav } from '../../../store'
import { scatterDuck } from '../../../store/btce/scatter/scatterDuck'
import { connect } from 'react-redux'

const NameCell = styled.div`

    font-size: 2.0em;
    color: #FFAE00;
  
`

const columns: ColumnProps<AuctionRow, any> = [
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
    title: 'my ask',
    dataIndex: 'ask',
    width: '12em',
  },
  {
    title: 'best bid',
    dataIndex: 'bestBid',
    width: 'calc((100% - 43em)/ 2',
  },
  {
    title: 'best bid%',
    dataIndex: 'bestBidPercent',
    width: 'calc((100% - 43em)/ 2',
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
    title: ' ',
    dataIndex: 'name',
    width: '10em',
    render: (value: string, record) =>
      record.bestBid > record.ask
          ? <AcceptCell record={record} />
          : '',
  },
  {
    title: ' ',
    dataIndex: 'name',
    width: '10em',
    render: (value: string, record: AuctionRow) =>
      <CancelCell record={record} />
     ,
  },
]


const AcceptCell = ({record}) => {
  const dispatch = useDispatch()
  return <GoldButtonCell
            label={'ACCEPT'}
            onClick={
              () =>
                  dispatch(
                    domeDuck.actions.acceptSell.started(record.id),
                  )
            }
          />
}

const CancelCell = ({record}) => {
  const dispatch = useDispatch()
  return (
    <GoldButtonCell
      label={'CANCEL'}
      onClick={() =>  dispatch(domeDuck.actions.cancelSell.started(record.id))}
    />
  )
}


const MySellsRaw = ({isLoading, mySells, scatterIsConnected, myError, auctionsError, dispatch}) => {

  const hisotry = useSubscribe(HistoryContext)

  let empty =
    <EmptyRows
      text={'No sells found. '}
      actionText={'Create a new sell'}
      onActionClick={() =>
        history.push(nav.auctionSellName())
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
  const data = useMappedState(selectAuctionsWithMySells)

  return <Table
            rowKey={'id'}
            isLoading={isLoading}
            columns={columns}
            data={mySells}
            emptyContent={empty}
            expandedRowRender={MyAuctionsExpandedRowRender}
          />

}
const selectAuctionsWithMySells = (state: FrontState) => {
  const mySells = (state.app.auction.my.value && state.app.auction.my.value.sells) || []
  const auctions = domeDuck.selectors.auctionRows(state).filter(item =>
    mySells.find( id => id === item.id),
  )

  const auctionsError = state.app.auction.auctions.error
  const myError = state.app.auction.my.error
  return {
    mySells: auctions,
    auctionsError,
    myError,
    scatterIsConnected: state.app.scatter.attached,
    isLoading: state.app.auction.auctions.status === 'started' || state.app.auction.my.status === 'started',
  }


}

export const MySells = connect(selectAuctionsWithMySells, dispatch => ({dispatch}))(MySellsRaw)
