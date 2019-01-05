import * as random from '@sha/random'
import { DAY_MILIS, sleep } from '@sha/utils'
import { times } from 'ramda'
import { AuctionVO } from './auctionApi'
import { APIConfig, APIResponse } from '../APITypes'
import { MyState, PlaceBidModel, SellModel } from '../../btce/auction/auctionDuck'
import { ID } from '../../btce/baseTypes'

const defaultTrueResponse = async () => {
  await sleep(Math.random() + 1000)
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

  fetchMyState: async (): Promise<APIResponse<MyState>> => {
    await sleep(Math.random() * 500)
    const {auctions, ...state} = auctionState
    return {
      result: state,
    }
  },
  placeBid: async (value: PlaceBidModel): Promise<APIResponse<boolean>> =>
    await defaultTrueResponse(),

  submitSell: async (value: SellModel): Promise<APIResponse<boolean>> =>
    await defaultTrueResponse(),

  accept: async (value: ID): Promise<APIResponse<boolean>> =>
    await defaultTrueResponse(),

  cancel: async (value: ID): Promise<APIResponse<boolean>> =>
    await defaultTrueResponse(),


  vote: async (value: ID): Promise<APIResponse<boolean>> =>
    await defaultTrueResponse(),
})



/**
 *
 * @param auctionID
 * @return number - th updated number of dislikes
 */
// const postDislike = (auctionID) => number

const getAuctionRow = (index: number): AuctionVO => {
  const name = names[index] + '.eosio'
  const publishedOn = random.faker.date.recent(20).getTime()
  const ask = Number((Math.random() * 1000).toFixed(2))
  return ({
    id: name + publishedOn,
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

const populate = (totalAuctionsLength = 10, myBidsQuant = 3, sells = 2) => {
  const auctions = times(getAuctionRow)(totalAuctionsLength)
  const myBiddingAuctions = random.takeRandomElements(auctions, myBidsQuant, myBidsQuant)
  const myBids = myBiddingAuctions.map(a => ({
    auctionId: a.id,
    bidAmount: Number((Math.random() * (Number(a.bestBid) - Number(a.ask)) + Number(a.ask)).toFixed(2)),
  }))
  const mySells = random.takeRandomElements(auctions, sells, sells).map( a => a.id)
  const myDislikes = populateDislikes(auctions)
  const auctionEOS = Math.floor(myBids.reduce((a, b) => a + b.bidAmount, 0) * 100) / 100
  return {
    auctions,
    myBids,
    mySells,
    myDislikes,
  }
}

const names = ['max', 'while', 'a', 'xxx', 'btc', 'rus', 'aaa', '1', '2', 'best', 'noname', 'plus']



const auctionState = populate()
