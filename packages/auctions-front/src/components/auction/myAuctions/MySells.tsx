import React from 'react'
import styled from '../../../styles'
import { ColumnProps } from '../../table/ColumnProps'
import { auctionDuck, AuctionRow } from '../../../store/btce/auction/auctionDuck'
import moment from '../home/HomePane'
import { FrontState } from '../../../store/reducer'
import { useDispatch, useMappedState } from '../../../hooks'
import { Table } from '../../table/Table'
import { MyAuctionsExpandedRowRender } from './MyBids'
import { GoldButtonCell } from '../../table/GoldButtonCell'

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
                    auctionDuck.actions.acceptSell.started(record.id),
                  )
            }
          />
}

const CancelCell = ({record}) => {
  const dispatch = useDispatch()
  return (
    <GoldButtonCell
      label={'CANCEL'}
      onClick={() =>  dispatch(auctionDuck.actions.cancelSell.started(record.id))}
    />
  )
}

const selectAuctionsWithMySells = (state: FrontState) => {
  const mySells = state.app.auction.mySells
  const auctions = auctionDuck.selectors.auctionRows(state).filter( item =>
    mySells.find( id => id === item.id),
  )
  return auctions

}
export const MySells = () => {
  const data = useMappedState(selectAuctionsWithMySells)

  return <Table
          columns={columns}
          data={data}
          expandedRowRender={MyAuctionsExpandedRowRender}
        />

}
