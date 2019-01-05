import { fork, put, takeLatest } from 'redux-saga/effects'
import { FactoryAction } from '@sha/fsa/src'
import { auctionDuck, PlaceBidModel, SellModel } from './auctionDuck'
import { nav, push } from '../../nav'
import { auctionApi } from '../../api/auction/auctionApi'
import { APIConfig } from '../../api/APITypes'
import { asyncWorker } from '../asyncWorker'

const log = console.log

export function* auctionSaga(config: APIConfig) {
  yield takeLatest(auctionDuck.actions.placeBid.done.isType, placeBidRedirect)
  yield takeLatest(auctionDuck.actions.submitSell.done.isType, submitSellRedirect)

  const api = auctionApi(config)
  yield fork(asyncWorker, auctionDuck.actions.fetchRecentAuctions, api.fetchRecentAuctions)
  yield fork(asyncWorker, auctionDuck.actions.fetchMyState, api.fetchMyState, true)
  yield fork(asyncWorker, auctionDuck.actions.cancelSell,  api.cancel, true)
  yield fork(asyncWorker, auctionDuck.actions.acceptSell, api.accept, true)
  yield fork(asyncWorker, auctionDuck.actions.postDislike, api.vote, true)
  yield fork(asyncWorker, auctionDuck.actions.placeBid, api.placeBid, true)
  yield fork(asyncWorker, auctionDuck.actions.submitSell, api.submitSell, true)
}

function* placeBidRedirect(action: FactoryAction<PlaceBidModel>) {
  yield put(push(nav.auctionMyAuctionsBids)())
}

function* submitSellRedirect(action: FactoryAction<SellModel>) {
  yield put(push(nav.auctionMyAuctionsSells)())
}
