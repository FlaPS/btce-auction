import { fork, put, takeLatest } from 'redux-saga/effects'
import { FactoryAction } from '@sha/fsa/src'
import { domeDuck, PlaceBidModel, SellModel } from './domeDuck'
import { nav, push } from '../../nav'
import { auctionApi } from '../../api/auction/auctionApi'
import { APIConfig } from '../../api/APITypes'
import { asyncWorker } from '../asyncWorker'
import { dispatchOnRoute } from '../dispatchOnRoute'
import { routeWorker } from '../routeWorker'
import { checkScatterSaga } from '../scatter/checkScatterSaga'

const log = console.log

export function* domeSaga(config: APIConfig) {
  yield takeLatest(domeDuck.actions.placeBid.done.isType, placeBidRedirect)
  yield takeLatest(domeDuck.actions.submitSell.done.isType, submitSellRedirect)

  const api = auctionApi(config)
  yield fork(asyncWorker, domeDuck.actions.fetchRecentAuctions, api.fetchRecentAuctions)
  yield fork(asyncWorker, domeDuck.actions.fetchMyState, api.fetchMyState, true)
  yield fork(asyncWorker, domeDuck.actions.cancelSell,  api.cancel, true)
  yield fork(asyncWorker, domeDuck.actions.acceptSell, api.accept, true)
  yield fork(asyncWorker, domeDuck.actions.postDislike, api.vote, true)
  yield fork(asyncWorker, domeDuck.actions.placeBid, api.placeBid, true)
  yield fork(asyncWorker, domeDuck.actions.submitSell, api.submitSell, true)

  yield fork(routeWorker, nav.auctionMyAuctionsBids, checkScatterSaga)
  yield fork(routeWorker, nav.auctionMyAuctionsSells, checkScatterSaga)
}

function* placeBidRedirect(action: FactoryAction<PlaceBidModel>) {
  yield put(push(nav.auctionMyAuctionsBids)())
}

function* submitSellRedirect(action: FactoryAction<SellModel>) {
  yield put(push(nav.auctionMyAuctionsSells)())
}
