import { fork, put } from 'redux-saga/effects'
import { scatterSaga } from './scatter/scatterSaga'
import { domeDuck } from './dome/domeDuck'
import { domeSaga } from './dome/domeSaga'
import { APIConfig } from '../api/APITypes'
import { uiDuck } from './ui/uiDuck'
import { explorerSaga } from './explorer/explorerSaga'
import { dispatchOnRoute } from './dispatchOnRoute'
import { nav } from '../nav'

export function* btceSaga(config: APIConfig) {
  yield fork(scatterSaga, config)
  yield fork(domeSaga, config)
  yield fork(uiDuck.saga)
  yield fork(explorerSaga)
}

