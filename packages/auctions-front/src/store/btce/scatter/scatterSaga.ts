import { fork, put, takeLatest } from 'redux-saga/effects'
import { asyncWorker } from '../asyncWorker'
import { APIConfig } from '../../api/APITypes'
import { scatterDuck } from './scatterDuck'
import { scatterApi } from '../../api/scatter'
import { domeDuck } from '../dome/domeDuck'
import { mapActionSaga } from '../mapActionSaga'
import { snackBarDuck } from '../ui/snackBarDuck'

export function* scatterSaga(config: APIConfig) {

  const api = scatterApi(config)

  yield fork(asyncWorker, scatterDuck.actions.attach, api.attach)
  yield fork(asyncWorker, scatterDuck.actions.detach, api.detach)

  yield fork(
    mapActionSaga,
    scatterDuck.actions.attach.done.isType, (action: ReturnType<typeof scatterDuck.actions.attach.done>) =>
      snackBarDuck.actions.push({
        text: 'Scatter attached successfully',
        type: 'info',
      }),
  )

  yield fork(
    mapActionSaga,
    scatterDuck.actions.attach.failed.isType, (action: ReturnType<typeof scatterDuck.actions.attach.failed>) =>
      snackBarDuck.actions.push({
        text: 'Scatter attach error',
        type: 'warning',
        actionText: 'Retry',
        action: scatterDuck.actions.attach.started(undefined),
      }),
  )

  yield takeLatest(scatterDuck.actions.attach.done.isType, function* () {
    yield put(domeDuck.actions.fetchMyState.started(undefined))
  })
}
