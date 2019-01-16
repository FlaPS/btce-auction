import { nav } from '../../nav'
import { explorerDuck } from './explorerDuck'
import { fork } from 'redux-saga/effects'
import { dispatchOnRoute } from '../dispatchOnRoute'
import { blocksApi } from '../../api/explorer/blocks'
import { transactionsApi } from '../../api/explorer/transactions'
import { producersApi } from '../../api/explorer/producers'
import { asyncWorker } from '../asyncWorker'

const routesAndActions = [
  [
    nav.explorer.liveFeed,
    explorerDuck.actions.fetchBlocks,
    blocksApi.getAll,
  ],
  [
    nav.explorer.liveFeed,
    explorerDuck.actions.fetchTransactions,
    transactionsApi.getAll,
  ],
  [
    nav.explorer.producers,
    explorerDuck.actions.fetchProducers,
    producersApi.getAll,
  ],
]

export function* explorerSaga() {
  for (const entry of routesAndActions) {
    yield fork(dispatchOnRoute, entry[0], entry[1].started)
    yield fork(asyncWorker, entry[1], entry[2])
  }

}

