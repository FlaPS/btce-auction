import { createFactory } from 'react'
import { actionCreatorFactory, AsyncState, FactoryAction, FactoryAnyAction } from '@sha/fsa'
import * as random from '@sha/random'
import { DAY_MILIS, now } from '@sha/utils'
import {times, add, update} from 'ramda'

const factory = actionCreatorFactory('auction')

const names = ['max', 'while', 'a', 'xxx', 'btc', 'rus', 'aaa', '1', '2', 'best', 'noname', 'plus']

const getAuctionRow = (index: number) =>
  ({
    id: index,
    name: names[index],
    suffix: 'eosio', //random.faker.address.stateAbbr(),
    ask: Number((Math.random() * 100).toFixed(2)),
    bestBid: Math.random() > 0.4 ? Number(((Math.random() * 200) + 100).toFixed(2)) : 0,
    bestBidPercent: (Math.random() * 100).toFixed(2),
    timeRemaining: Math.random() * DAY_MILIS * 20,
    dislikes: random.randomNatural(200),
    publishedOn: random.faker.date.recent(10).getTime(),
    message: random.faker.lorem.words(random.randomNatural(15)),
  })

export type AuctionRow = ReturnType<typeof getAuctionRow>


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

export type PlaceBidModel = Partial<ReturnType<typeof defaultPlaceBidModel>>

const actions = {
  placeBid: factory<PlaceBidModel>('placeBid'),
  submitSell: factory<SellModel>('sell'),
  fetchRecentAuctions: factory.async<undefined, AuctionRow[]>('fetchUsers'),
}

type Bid = {
  auctionId: number
  bidAmount: number
}

type Sell = SellModel & Partial<AuctionRow>

type AuctionState = ReturnType<typeof populate>

const populate = (totalAuctionsLength = 10, myBidsQuant = 3, sells = 2) => {
  const auctions = times(getAuctionRow)(totalAuctionsLength)
  const myBiddingAuctions = random.takeRandomElements(auctions, myBidsQuant, myBidsQuant)
  const myBids = myBiddingAuctions.map(a => ({
    auctionId: a.id,
    bidAmount: Number((Math.random() * (Number(a.bestBid) - Number(a.ask)) + Number(a.ask)).toFixed(2))
  }))
  const mySells = random.takeRandomElements(auctions, sells, sells).map( a => a.id)

  const auctionEOS = Math.floor(myBids.reduce((a, b) => a + b.bidAmount, 0) * 100) / 100
  return {
    auctions,
    myBids,
    mySells,
    scatter: {
      usdMultiplier: 1.8,
      freeEOS: auctionEOS + 592.23,
      auctionEOS,
    },
  }
}

const reducer = (state: AuctionState = populate(), action: FactoryAnyAction): AuctionState => {
  if (actions.submitSell.isType(action)) {
    const newAuction = {...action.payload, id: state.auctions.length, suffix: 'eosio', publishedOn: now()}
    return {
      auctions: [ newAuction as any as AuctionRow, ...state.auctions],
      myBids: state.myBids,
      mySells: [newAuction.id, ...state.mySells],
      scatter: state.scatter,
    }
  }

  if (actions.placeBid.isType(action)) {
    const [name, suffix] = action.payload.EOSAccountName.split('.')
    const prevAuction = state.auctions.find( a => a.name === name && a.suffix === suffix)
    const index = state.auctions.indexOf(prevAuction)
    const newAuction = {...prevAuction, bestBid: action.payload.bidAmount}
    const auctionId = newAuction.id

    return {
      auctions: update(index, newAuction, state.auctions),
      myBids: [...state.myBids, {auctionId, bidAmount: action.payload.bidAmount}],
      mySells: state.mySells,
      scatter: {
        ...state.scatter,
        freeEOS: state.scatter.freeEOS - action.payload.bidAmount,
        auctionEOS: state.scatter.auctionEOS + action.payload.bidAmount,
      },
    }
  }

  return state
}


export const auctionDuck = {
  actions,
  reducer,
}
