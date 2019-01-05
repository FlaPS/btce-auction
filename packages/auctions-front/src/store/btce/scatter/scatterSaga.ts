import { fork, put, takeLatest } from 'redux-saga/effects'
import { asyncWorker } from '../asyncWorker'
import { APIConfig } from '../../api/APITypes'
import { scatterDuck } from './scatterDuck'
import { scatterApi } from '../../api/scatter/scatterApi'
import { auctionDuck } from '../auction/auctionDuck'

export function* scatterSaga(config: APIConfig) {

  const api = scatterApi(config)

  yield fork(asyncWorker, scatterDuck.actions.attach, api.attach)

  yield takeLatest(scatterDuck.actions.attach.done.isType, function* () {
    yield put(auctionDuck.actions.fetchMyState.started())
  })
}
