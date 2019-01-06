import { domeDuck, AuctionState } from './dome/domeDuck'
import { scatterDuck, ScatterState } from './scatter/scatterDuck'

export type BTCEAppState = {
  scatter: ScatterState
  auction: AuctionState
}

const reducer = (state: BTCEAppState = {} as any as BTCEAppState , action) => {
  const scatter = scatterDuck.reducer(state.scatter, action)
  const auction = domeDuck.reducer(state.auction, action)

  if (scatter !== state.scatter || action !== state.auction)
    state = {auction, scatter}

  return state
}


export const btceDuck = {
  reducer,
}

