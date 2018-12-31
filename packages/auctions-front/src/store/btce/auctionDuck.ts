import { createFactory } from 'react'
import { actionCreatorFactory } from '@sha/fsa'

const factory = actionCreatorFactory('auction')

export const defaultSellModel = () => ({
  salePrice: undefined as number,
  EOSname: undefined as string,
  receivingAccount: undefined as string,
  email: undefined as string,
  auctionPeriod: undefined as number,
  message: undefined as string,
})

export type SellModel = Partial<ReturnType<typeof defaultSellModel>>


export const defaultPlaceBidModel = () => ({
  bidAmount: undefined as number,
  EOSAccountName: undefined as string,
})

export type PlaceBidModel = Partial<ReturnType<typeof defaultPlaceBidModel>>

const actions = {
  placeBid: factory<PlaceBidModel>('placeBid'),
  submitSell: factory<SellModel>('sell'),
  
}

export const auctionDuck = {
  actions,
}
