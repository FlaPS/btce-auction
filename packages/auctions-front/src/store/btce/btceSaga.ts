import { fork, put } from 'redux-saga/effects'
import { scatterSaga } from './scatter/scatterSaga'
import { auctionDuck } from './auction/auctionDuck'
import { auctionSaga } from './auction/auctionSaga'
import { APIConfig } from '../api/APITypes'

export function* btceSaga(config: APIConfig) {
  yield fork(scatterSaga, config)
  yield fork(auctionSaga, config)

  yield put(auctionDuck.actions.fetchRecentAuctions.started())
  // yield put(auctionDuck.actions.fetchMyState.started())
}

