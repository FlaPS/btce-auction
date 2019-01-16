import { NavRoute, isLocation } from '../nav'
import { ActionCreator, FactoryAnyAction } from '@sha/fsa'
import { put, takeLatest, select } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'connected-react-router'


export function* dispatchOnRoute<T, P>(nav: NavRoute<T>, actionCreatorToDispatch: ActionCreator<P>, isExact = false) {


  let lastMatched = false

  function* worker(action) {
      yield put(actionCreatorToDispatch())
  }

  yield takeLatest( (action: FactoryAnyAction) => {

      const result = isLocation(nav, isExact)(action)

      if (result && !lastMatched) {
        lastMatched = true
        return result
      }

      if (!result && lastMatched && action.type.includes(LOCATION_CHANGE))
        lastMatched = false

      return false
    },
    worker,
  )

}
