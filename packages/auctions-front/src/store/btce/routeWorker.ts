import { NavRoute, isLocation } from '../nav'
import { ActionCreator, FactoryAnyAction } from '@sha/fsa'
import { put, takeLatest, select } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router'
import { FrontState } from '../reducer'

export function* routeWorker<T, P>(nav: NavRoute<T>, worker: Function) {
  let pathname = ''
  yield takeLatest( (action: FactoryAnyAction) => {
      const result = isLocation(nav)(action)
      if (result && (action.payload.location.pathname !== pathname)) {
        pathname = action.payload.location.pathname
        return result
      }
      return false
    },
    function* (action) {
      pathname = yield select((state: FrontState) => state.router.location.pathname)

      yield* worker(action)
    },
  )

}
