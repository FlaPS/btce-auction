import { actionCreatorFactory, AsyncState, FactoryAnyAction } from '@sha/fsa/src'
import { now } from '@sha/utils/src'
import { add, compose, equals, lensIndex, lensPath, over, reject, update } from 'ramda'
import { FrontState } from '../../reducer'

import { dislikesDuck } from './dislikesDuck'
import { ID } from '../baseTypes'
import { AuctionVO } from '../../api/auction/auctionApi'

const factory = actionCreatorFactory('auction')

const actions = {
  fetchRecentAuctions: factory.async<undefined, AuctionVO[]>('fetchRecentAuctions'),
  fetchMyState: factory.async<undefined, MyState>('fetchMyState'),
  placeBid: factory.async<PlaceBidModel>('placeBid'),
  submitSell: factory.async<SellModel>('sell'),
  acceptSell: factory.async<ID>('accept'),
  cancelSell: factory.async<ID>('cancel'),
  postDislike: factory.async<ID>('postDislike'),
}



const selectAuctionRows = (state: FrontState) => {
  const source: AuctionVO[] = state.app.auction.auctions
  const myDislikes: string[] = state.app.auction.myDislikes
  const currentTime = now()
  return source.map( auction => {
      const [name, suffix = ''] = auction.name.split('.')
      return {
        ...auction,
        bestBidPercent: auction.bestBid ? (auction.bestBid).toFixed(2) : '0',
        length: auction.name.length,
        name,
        suffix,
        isDislikedByMe: myDislikes.includes(auction.id),
      }
    },
  )
}


export type AuctionRow =
  & AuctionVO
  & {
    bestBidPercent?: number
    length: number
    suffix: string
    isDislikedByMe?: boolean
  }


export const defaultSellModel = () => ({
  ask: '' as any as number,
  name: '' as string,
  receivingAccount: '' as string,
  email: '' as string,
  auctionPeriod: '' as any as number,
  message: '' as string,
})

export type SellModel = Partial<ReturnType<typeof defaultSellModel>>


export const defaultPlaceBidModel = () => ({
  bidAmount: '' as any as number,
  EOSAccountName: '' as string,
})

export type PlaceBidModel = {
  bidAmount: number // decimal number with two digits after point
  auctionId: string // Account name with suffix to buy
}

export type MyState = {
  myDislikes: string[]
  myBids: PlaceBidModel[]
  mySells: string[]
}

const defaultAuctionState = {
  auctions: [] as AuctionVO[],
  myBids: [],
  mySells: [],
  myDislikes: [],
}

export type AuctionState = typeof defaultAuctionState


const reducer = (state: AuctionState = defaultAuctionState, action: FactoryAnyAction): AuctionState => {
  if (actions.fetchMyState.done.isType(action))
    state = {...state, ...action.payload.result}

  if (actions.fetchRecentAuctions.done.isType(action))
    state = {...state, auctions: action.payload.result}

  if (actions.submitSell.done.isType(action)) {
    const publishedOn = now()
    const params = action.payload.params
    const newAuction = {...params, id: params.name + publishedOn, publishedOn}
    state = {
      auctions: [ newAuction as any as AuctionVO, ...state.auctions],
      myBids: state.myBids,
      mySells: [newAuction.id, ...state.mySells],
      myDislikes: state.myDislikes,
    }
  }

  if (actions.acceptSell.done.isType(action) || actions.cancelSell.done.isType(action)) {
    const params = action.payload.params
    const auction = state.auctions.find( a => a.id === params)
    const idEquals = equals(params)
    const rejectId = reject(idEquals)
    state = {
      ...state,
      auctions: reject(a => a.id === params, state.auctions),
      mySells: rejectId(state.mySells),
      myDislikes:  rejectId(state.myDislikes),
    }

  }

  if (actions.placeBid.done.isType(action)) {
    const params = action.payload.params
    const prevAuction = state.auctions.find( a => a.id === params.auctionId)
    const index = state.auctions.indexOf(prevAuction)
    const newAuction = {...prevAuction, bestBid: params.bidAmount}
    const auctionId = newAuction.id

    state = {
      auctions: update(index, newAuction, state.auctions),
      myBids: [...state.myBids, {auctionId, bidAmount: params.bidAmount}],
      mySells: state.mySells,

      myDislikes: state.myDislikes,
    }
  }

    if (actions.postDislike.done.isType(action)) {
      const index = state.auctions.findIndex(a => a.id === action.payload.params )
      const lens = compose(lensPath(['auctions']),  lensIndex(index), lensPath(['dislikes']))
      state = over(lens, add(1), state)
      state = { ...state, myDislikes: dislikesDuck.reducer(state.myDislikes, action) }
    }



  return state
}


export const auctionDuck = {
  optics: {

  },
  selectors: {
    myDislikes: (state): AsyncState<string[]> => state.app.auction.myDislikes,
    auctionRows: selectAuctionRows,
  },
  actions,
  reducer,
  factory,
}
