import { NavRoute, isLocation } from '../nav'
import { ActionCreator, FactoryAnyAction } from '@sha/fsa'
import { put, takeLatest } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router'

export function* dispatchOnRoute<T, P>(nav: NavRoute<T>, actionCreatorToDispatch: ActionCreator<P>) {
  function* worker(action) {
    yield put(actionCreatorToDispatch())
  }

  yield takeLatest( (action: FactoryAnyAction) => {
      const result = isLocation(nav)(action) && nav.match(action.payload.location.patchname)s
      return result
    },
    worker,
  )

}
