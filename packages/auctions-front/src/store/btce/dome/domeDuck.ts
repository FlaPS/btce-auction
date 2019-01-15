import { actionCreatorFactory, AsyncState, FactoryAnyAction } from '@sha/fsa/src'
import { now } from '@sha/utils/src'
import { add, compose, equals, lensIndex, lensPath, over, reject, update, assocPath, prepend, append } from 'ramda'
import { FrontState } from '../../reducer'

import { dislikesDuck } from './dislikesDuck'
import { ID } from '../baseTypes'
import { AuctionVO } from '../../api/auction'
import { generateGuid, generateUint64Guid } from '@sha/random'

const factory = actionCreatorFactory('auction')

const actions = {
  fetchRecentAuctions: factory.async<undefined, AuctionVO[]>('fetchRecentAuctions'),
  fetchMyState: factory.async<undefined, MyState>('fetchMyState'),
  placeBid: factory.async<PlaceBidModel>('placeBid'),
  instantBuy: factory.async<InstantBuyModel>('instantBuy'),
  submitSell: factory.async<SellModel>('sell'),
  acceptSell: factory.async<{auctionId: string, name: string}>('accept'),
  cancelSell: factory.async<{auctionId: string, name: string}>('cancel'),
  postDislike: factory.async<{auctionId: string, name: string}>('postDislike'),
}

const selectAuctionRows = (state: FrontState) => {
  const source: AuctionVO[] = state.app.auction.auctions.value || []
  const myDislikes: string[] = (state.app.auction.my.value && state.app.auction.my.value.dislikes) || []
  const currentTime = now()
  return source.map( auction => {
      const [name, suffix = ''] = auction.name.split('.')
      return {
        ...auction,
        bestBidPercent: Number(auction.bestBid ? (auction.bestBid).toFixed(2) : '0'),
        length: auction.name.length,
        name,
        suffix,
        fullName: name + (suffix ? ('.' + suffix) : ''),
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
  auctionID: generateUint64Guid(),
  ask: '' as any as number,
  name: '' as string,
  receivingAccount: '' as string,
  message: '' as string,
})

export type SellModel = Partial<ReturnType<typeof defaultSellModel>>


export const defaultPlaceBidModel = () => ({
  bidAmount: '' as any as number,
  accountId: '' as string,
  ask: 1,
  nameToBuy: '',
})

export type InstantBuyModel = {
  from: string,
  to: string,
  quantity: string,
  memo: string
}

export type PlaceBidModel = {
  bidAmount: number // decimal number with two digits after point
  auctionId: string // Auction ID
  nameToBuy: string
}

export type MyState = {
  dislikes: string[]
  bids: PlaceBidModel[]
  sells: string[]
}

const defaultAuctionState = {
  auctions: {
    value: [],
  }  as AsyncState<AuctionVO[]>,
  my: {
    value: {
      bids: [],
      sells: [],
      dislikes: [],
    },
  }  as AsyncState<MyState>,

}

export type AuctionState = typeof defaultAuctionState

const reducer = (state: AuctionState = defaultAuctionState, action: FactoryAnyAction): AuctionState => {

  const auctions =  actions.fetchRecentAuctions.asyncReducer(state.auctions, action)
  const my = actions.fetchMyState.asyncReducer(state.my, action)

  if (auctions !== state.auctions || my !== state.my)
    state = {
      auctions,
      my,
    }

  if (actions.submitSell.done.isType(action)) {
    const publishedOn = now()
    const params = action.payload.params
    const newAuction = {...params, id: params.name + '_' + publishedOn, publishedOn}

    state = over(lensPath(['auctions', 'value']), prepend(newAuction), state)
    state = over(lensPath(['my', 'value', 'sells']), prepend(newAuction.id), state)
  }

  if (actions.acceptSell.done.isType(action) || actions.cancelSell.done.isType(action)) {
    const params = action.payload.params
    const auction = state.auctions.value.find( a => a.id === params)
    const idEquals = equals(params)
    const rejectId = reject(idEquals)

    state = over(lensPath(['auctions', 'value']), reject(a => a.id === params), state)
    state = over(lensPath(['my', 'value', 'sells']), rejectId, state)
    state = over(lensPath(['my', 'value', 'dislikes']), rejectId, state)
  }

  if (actions.placeBid.done.isType(action)) {
    const params = action.payload.params
    const prevAuction = state.auctions.value.find( a => a.id === params.auctionId)
    const index = state.auctions.value.indexOf(prevAuction)
    const newAuction = {...prevAuction, bestBid: params.bidAmount}
    const auctionId = newAuction.id

    // add new auction to the local state
    state = over(lensPath(['auctions', 'value']),  update(index, newAuction), state)

    // add new bud to my bids
    state = over(lensPath(['my', 'value', 'bids']), prepend({auctionId, bidAmount: params.bidAmount}), state)

  }

  if (actions.postDislike.done.isType(action)) {
    const auctionID = action.payload.params
    const index = auctions.value.findIndex(a => a.id === auctionID )
    const lens = compose(lensPath(['auctions', 'value']),  lensIndex(index), lensPath(['dislikes']))

    // increment dislikes of an auction
    state = over(lens, add(1), state)

    state = over(lensPath(['my', 'value', 'dislikes']), append(auctionID), state)
  }


  return state
}


export const domeDuck = {
  optics: {

  },
  selectors: {
    myDislikes: (state): AsyncState<string[]> => state.app.auction.my.dislikes,
    myState: state => state.app.auction.my,
    auctionRows: selectAuctionRows,
  },
  actions,
  reducer,
  factory,
}
