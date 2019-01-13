import * as fsa from '@sha/fsa'
import { append, equals, reject } from 'ramda'
import { combineReducers } from 'redux'
import { snackBarDuck } from './snackBarDuck'

const factory = fsa.actionCreatorFactory('ui')

const actions = {
  busy: factory<string|undefined>('busy'),
  unbusy: factory<string|undefined>('unbusy'),
}

const busyReducers = fsa.reducerWithInitialState([])
  .case(actions.busy, (state, id) => append(id, state))
  .case(actions.unbusy, (state, id) => reject(equals(id), state))


const reducer = combineReducers({
  busy: busyReducers,
  snackBar: snackBarDuck.reducer,
})

export const uiDuck = {
  actions,
  reducer,
}
