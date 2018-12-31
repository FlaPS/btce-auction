import { createFactory } from 'react'
import { actionCreatorFactory } from '@sha/fsa'

const factory = actionCreatorFactory('auction')

export const defaultSellModel = () => ({
  salePrice: '' as any as number,
  EOSname: '' as string,
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

export const auctionDuck = {
  actions,
}
