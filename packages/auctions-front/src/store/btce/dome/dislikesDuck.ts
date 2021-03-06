import { actionCreatorFactory, FactoryAnyAction, isType } from '@sha/fsa/src'
import { append } from 'ramda'
import { domeDuck } from './domeDuck'
import { FrontState } from '../../reducer'


const factory = actionCreatorFactory('dome/dislikes')


const reducer = (
  state: string[] = [],
  action: FactoryAnyAction): string[] => {

  if (isType(domeDuck.actions.postDislike.done)(action)) {
    const auctionID = action.payload.params
    state = append(auctionID, state)
  }

  return state
}

export type MyDislikesState = ReturnType<typeof reducer>

export const dislikesDuck = {
  selectors: {
    myDislikes: (state: FrontState) => state.app.auction.myDislikes,
  },
  reducer,
  factory,
}
