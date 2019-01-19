import * as random from '../../../../../../random/src'
import { DAY_MILIS, sleep, now} from '../../../../../../utils/src'
import { times } from 'ramda'
import { AuctionVO, ClosedAuctionVO } from '..'
import { APIConfig, APIResponse } from '../../APITypes'
import { MyState, BidModel, SellModel } from '../../../btce/dome/domeDuck'
import { ID } from '../../../btce/baseTypes'

import { faker, generateGuid, generateUint64Guid } from '../../../../../../random/src'
import { mockResponse } from '../../mockResponse'
import { mockScatterAccountName } from '../../scatter/mockImpl'


const defaultTrueResponse = async () => {
  await sleep(Math.random() + 500)
  return {
    result: true,
  }
}

export default (config: APIConfig) => ({

  fetchRecentAuctions: async (): Promise<APIResponse<AuctionVO[]>> => {
    await sleep(Math.random() * 500)
    return {
      result: auctionState.auctions,
    }
  },

  fetchMyState: async (): Promise<APIResponse<MyState>> => { // todo: set them empty
    await sleep(Math.random() * 500 )
    const {auctions, ...state} = auctionState
    return {
      result: state.my,
    }
  },

  placeBid: async (value: BidModel): Promise<APIResponse<boolean>> =>
    await defaultTrueResponse(),

  buyNow: async (value: BidModel): Promise<APIResponse<ClosedAuctionVO>> => {
    await sleep(Math.random() * 500 )
    const result = {
      id: value.auctionId,
      closedAt: now(),
      buyer: mockScatterAccountName,
      payedAmount: value.bidAmount,
    }
    return {result}
  },

  submitSell: async (value: SellModel): Promise<APIResponse<boolean>> =>
    await defaultTrueResponse(),

  accept: async (value: {auctionId: string, name: string}): Promise<APIResponse<boolean>> =>
    await defaultTrueResponse(),

  cancel: async (value: {auctionId: string, name: string}): Promise<APIResponse<boolean>> =>
    await defaultTrueResponse(),


  vote: async (value: {auctionId: string, name: string}): Promise<APIResponse<boolean>> =>
    await defaultTrueResponse(),
})


const names = ['p.io', 'max', 'while', 'a', 'xxx', 'btc', 'rus', 'aaa', '1', '2', 'best', 'noname', 'plus']


/**
 *
 * @param auctionID
 * @return number - th updated number of dislikes
 */
// const postDislike = (auctionID) => number

const getAuctionRow = (index: number): AuctionVO => {
  const firstName = index < names.length ? names[index] : faker.lorem.word()
  const name = firstName.includes('.') ? firstName : (firstName + '.eosio')
  const publishedOn = random.faker.date.recent(20).getTime()
  const ask = Number((Math.random() * 1000).toFixed(2))
  return ({
    id: generateUint64Guid(),
    name,
    ask,
    bestBid: Math.random() > 0.4 ? Number(((Math.random() * ask)).toFixed(2)) : 0,
    dislikes: random.randomNatural(200),
    publishedOn,
    duration: DAY_MILIS * 10,
    message: random.faker.lorem.words(random.randomNatural(15)),
  })
}

const populateDislikes = (auctions: AuctionVO[]) => {
  return  random.takeRandomElements(auctions, 3, 1).map(a => a.id)
}

const populate = (totalAuctionsLength = 10, myBidsQuant = 3, sellsQuant = 2) => {
  const auctions = times(getAuctionRow)(totalAuctionsLength)
  const myBiddingAuctions = random.takeRandomElements(auctions, myBidsQuant, myBidsQuant)
  const bids = myBiddingAuctions.map(a => ({
    auctionId: a.id,
    bidAmount: Number((Math.random() * (Number(a.bestBid) - Number(a.ask)) + Number(a.ask)).toFixed(2)),
  }))
  const sells = random.takeRandomElements(auctions, sellsQuant, sellsQuant).map( a => a.id)
  const dislikes = populateDislikes(auctions)
  const auctionEOS = Math.floor(bids.reduce((a, b) => a + b.bidAmount, 0) * 100) / 100
  return {
    auctions,
    my: {
      bids,
      sells,
      dislikes,
    },
  }
}


const auctionState = populate(12)
