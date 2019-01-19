import { fork, put, takeLatest } from 'redux-saga/effects'
import { FactoryAction } from '@sha/fsa/src'
import { domeDuck, BidModel, SellModel } from './domeDuck'
import { nav, push } from '../../nav'
import { auctionApi } from '../../api/auction'
import { APIConfig } from '../../api/APITypes'
import { asyncWorker } from '../asyncWorker'
import { dispatchOnRoute } from '../dispatchOnRoute'
import { routeWorker } from '../routeWorker'
import { checkScatterSaga } from '../scatter/checkScatterSaga'
import { mapActionSaga } from '../mapActionSaga'
import { snackBarDuck } from '../ui/snackBarDuck'
import { scatterDuck } from '../scatter/scatterDuck'
import { accountApi } from '../../api/explorer/accounts'

const log = console.log

export function* domeSaga(config: APIConfig) {
  yield fork(dispatchOnRoute, nav.auction, domeDuck.actions.fetchRecentAuctions.started)
  yield takeLatest(domeDuck.actions.placeBid.done.isType, placeBidRedirect)
  yield takeLatest(domeDuck.actions.buyNow.done.isType, placeBidRedirect)
  yield takeLatest(domeDuck.actions.submitSell.done.isType, submitSellRedirect)

  const api = auctionApi(config)

  yield fork(asyncWorker, domeDuck.actions.fetchRecentAuctions, api.fetchRecentAuctions, false)
  yield fork(asyncWorker, domeDuck.actions.fetchMyState, api.fetchMyState, true)
  yield fork(asyncWorker, domeDuck.actions.cancelSell,  api.cancel, true)
  yield fork(asyncWorker, domeDuck.actions.acceptSell, api.accept, true)
  yield fork(asyncWorker, domeDuck.actions.postDislike, api.vote, true)
  yield fork(asyncWorker, domeDuck.actions.placeBid, api.placeBid, true)
  yield fork(asyncWorker, domeDuck.actions.submitSell, api.submitSell, true)
  yield fork(asyncWorker, domeDuck.actions.buyNow, api.buyNow, true)

  yield fork(asyncWorker, domeDuck.actions.getMyAccount, accountApi.getAccountInfo, true)
  yield fork(asyncWorker, domeDuck.actions.getCheckAccount, accountApi.getAccountInfo, false)
  const actions = domeDuck.actions


  // Scatter attached ? Fetch my account state
  yield fork(
    mapActionSaga,
    scatterDuck.actions.attach.done.isType, (action: ReturnType<typeof scatterDuck.actions.attach.done>) =>
      domeDuck.actions.getMyAccount.started(action.payload.result.account),
  )

  // Bid success
  yield fork(
    mapActionSaga,
    actions.placeBid.done.isType, (action: ReturnType<typeof actions.placeBid.done>) =>
      snackBarDuck.actions.push({
        text: 'You successfully placed a bid for ' + action.payload.params.nameToBuy,
        type: 'success',
      }),
  )

  // Bid fail
  yield fork(
    mapActionSaga,
    actions.placeBid.failed.isType, (action: ReturnType<typeof actions.placeBid.failed>) =>
      snackBarDuck.actions.push({
        text: 'Your bid was rejected',
        type: 'warning',
        actionText: 'Bid again',
        action: actions.placeBid.started(action.payload.params),
      }),
  )

  // Place a sell success
  yield fork(
    mapActionSaga,
    actions.submitSell.done.isType, (action: ReturnType<typeof actions.submitSell.done>) =>
      snackBarDuck.actions.push({
        text: 'You successfully submitted a sell for ' + action.payload.params.name,
        type: 'success',
      }),
  )

  //  Place a sell error
  yield fork(
    mapActionSaga,
    actions.submitSell.failed.isType, (action: ReturnType<typeof actions.submitSell.failed>) =>
      snackBarDuck.actions.push({
        text: 'Your sell was rejected',
        type: 'warning',
        actionText: 'Retry',
        action: actions.submitSell.started(action.payload.params),
      }),
  )

  // Accept sell
  yield fork(
    mapActionSaga,
    actions.acceptSell.done.isType, (action: ReturnType<typeof actions.acceptSell.done>) =>
      snackBarDuck.actions.push({
        text: 'You successfully accepted the sell',
        type: 'success',
      }),
  )

  // Accept sell error
  yield fork(
    mapActionSaga,
    actions.acceptSell.failed.isType, (action: ReturnType<typeof actions.acceptSell.failed>) =>
      snackBarDuck.actions.push({
        text: 'Your acceptance was rejected',
        type: 'warning',
        actionText: 'Retry',
        action: actions.acceptSell.started(action.payload.params),
      }),
  )

  // Cancel sell
  yield fork(
    mapActionSaga,
    actions.cancelSell.done.isType, (action: ReturnType<typeof actions.cancelSell.done>) =>
      snackBarDuck.actions.push({
        text: 'You  has successfully canceled the sell',
        type: 'success',
      }),
  )

  // cancel sell error
  yield fork(
    mapActionSaga,
    actions.cancelSell.failed.isType, (action: ReturnType<typeof actions.cancelSell.failed>) =>
      snackBarDuck.actions.push({
        text: 'Your sell cancel was rejected',
        type: 'warning',
        actionText: 'Retry',
        action: actions.cancelSell.started(action.payload.params),
      }),
  )

  yield fork(routeWorker, nav.auctionMyAuctionsBids, checkScatterSaga)
  yield fork(routeWorker, nav.auctionMyAuctionsSells, checkScatterSaga)
}

function* placeBidRedirect(action: FactoryAction<BidModel>) {
  yield put(push(nav.auctionMyAuctionsBids)())
}

function* submitSellRedirect(action: FactoryAction<SellModel>) {
  yield put(push(nav.auctionMyAuctionsSells)())
}
