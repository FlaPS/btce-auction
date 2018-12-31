import { put, takeLatest } from 'redux-saga/effects'
import { FactoryAction, isType } from '@sha/fsa'
import { auctionDuck, PlaceBidModel, SellModel } from './auctionDuck'
import { nav, push } from '../nav'

export function* auctionSaga() {
  yield takeLatest(isType(auctionDuck.actions.placeBid), placeBidWorker)
  yield takeLatest(isType(auctionDuck.actions.submitSell), submitSellWorker)



}

function* placeBidWorker(action: FactoryAction<PlaceBidModel>) {
  yield put(push(nav.auctionMyAuctionsBids)())
}

function* submitSellWorker(action: FactoryAction<SellModel>) {
  yield put(push(nav.auctionMyAuctionsSells)())
}
