import { domeDuck, AuctionState } from './dome/domeDuck'
import { scatterDuck, ScatterState } from './scatter/scatterDuck'
import { explorerDuck, ExplorerState } from './explorer/explorerDuck'

export type BTCEAppState = {
  scatter: ScatterState
  auction: AuctionState
  explorer: ExplorerState
}

const reducer = (state: BTCEAppState = {} as any as BTCEAppState , action) => {
  const scatter = scatterDuck.reducer(state.scatter, action)
  const auction = domeDuck.reducer(state.auction, action)
  const explorer = explorerDuck.reducer(state.explorer, action)
  if (
    scatter !== state.scatter ||
    auction !== state.auction ||
    explorer !== state.explorer
  )
    state = {auction, scatter, explorer}

  return state
}


export const btceDuck = {
  reducer,
}

