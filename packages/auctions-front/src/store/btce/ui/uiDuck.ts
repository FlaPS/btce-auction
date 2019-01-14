import * as fsa from '@sha/fsa'
import { append, equals, reject } from 'ramda'
import { combineReducers } from 'redux'
import { snackBarDuck } from './snackBarDuck'
import { fork } from 'redux-saga/effects'
import { mapActionSaga } from '../mapActionSaga'
import { FactoryAnyAction } from '@sha/fsa'

const factory = fsa.actionCreatorFactory('ui')

const actions = {
  busy: factory<string|undefined>('busy'),
  unbusy: factory<string|undefined>('unbusy'),
}

const busyReducers = (state: any[] = [], action: FactoryAnyAction): any[] => {
  if(actions.busy.isType(action))
    return append(action.payload, state)

  if (actions.unbusy.isType(action))
    return  reject(equals(action.payload), state)

  return state
}



const reducer = combineReducers({
  busy: busyReducers,
  snackBar: snackBarDuck.reducer,
})


function* saga() {
  yield fork(snackBarDuck.saga)
}

export const uiDuck = {
  actions,
  reducer,
  saga,
}
