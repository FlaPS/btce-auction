import { combineReducers } from 'redux'
import { auctionDuck } from './auctionDuck'

const reducer = (state: any = {}, action) => state


export const btceDuck = {
  reducer: combineReducers({
    auction: auctionDuck.reducer,

  }),
}
