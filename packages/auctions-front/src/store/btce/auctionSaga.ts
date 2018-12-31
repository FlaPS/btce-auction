import { takeLatest } from 'redux-saga/effects'
import { FactoryAction, isType } from '@sha/fsa'
import { auctionDuck, PlaceBidModel, SellModel } from './auctionDuck'

export function* auctionSaga() {
  yield takeLatest(isType(auctionDuck.actions.placeBid), placeBidWorker)
  yield takeLatest(isType(auctionDuck.actions.submitSell), submitSellWorker)



}

function* placeBidWorker(action: FactoryAction<PlaceBidModel>) {
  console.log('palce bid', action)
}

function* submitSellWorker(action: FactoryAction<SellModel>) {
  console.log('Submit sell', action)
}
