import { fork, put } from 'redux-saga/effects'
import { scatterSaga } from './scatter/scatterSaga'
import { domeDuck } from './dome/domeDuck'
import { domeSaga } from './dome/domeSaga'
import { APIConfig } from '../api/APITypes'

export function* btceSaga(config: APIConfig) {
  yield fork(scatterSaga, config)
  yield fork(domeSaga, config)

  yield put(domeDuck.actions.fetchRecentAuctions.started())
  // yield put(domeDuck.actions.fetchMyState.started())
}

