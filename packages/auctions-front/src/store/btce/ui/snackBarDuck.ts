import { FactoryAnyAction, actionCreatorFactory, reducerWithInitialState, FactoryAction } from '@sha/fsa'
import {append, reject, equals} from 'ramda'
import { FrontState } from '../../reducer'
import { put, takeEvery, select, race, take,  } from 'redux-saga/effects'
import {delay} from 'redux-saga'
import { scatterDuck } from '../scatter/scatterDuck'

export type SnackBarData = {

  text: string
  action?: FactoryAnyAction
  autoDismissDelay?: number
  actionText?: string
  type?: 'info' | 'warning' | 'success'
}

const factory = actionCreatorFactory('snackbar')

const actions = {
  push: factory<SnackBarData>('push'),
  dismiss: factory<string>('dismiss'),
  resolve: factory<string>('resolve'),
}


const reducer = (state = [] as FactoryAction<SnackBarData>[], action: FactoryAnyAction) => {
  if (actions.push.isType(action))
    return [...state, action]

  if (actions.dismiss.isType(action) || actions.resolve.isType(action))
    return reject( source =>  source.guid === action.payload, state)

  return state
}

const defaultDelay = 5000

function* saga() {
  function* raceAction(action: FactoryAction<SnackBarData>) {
    const timeout = action.payload.autoDismissDelay || defaultDelay
    const guid = action.guid

    const isDismissed = (test: FactoryAnyAction) =>
      actions.dismiss.isType(test) && guid === test.payload

    const isResolved = (test: FactoryAnyAction) =>
      actions.resolve.isType(test) && guid === test.payload

    const {delayed, dismissed, resolved} = race({
      delayed: delay(timeout),
      dismissed: take(isDismissed),
      resolved: take(isResolved),
    })

    if (delayed)
      yield put(actions.dismiss(action.guid))

    else if (resolved)
      yield put(action.payload.action)

  }
  yield takeEvery(actions.push.isType, raceAction)
}


export const snackBarDuck = {
  actions,
  factory,
  reducer,
  selector: (state: FrontState) => state.ui.snackBar,
  saga,
}
