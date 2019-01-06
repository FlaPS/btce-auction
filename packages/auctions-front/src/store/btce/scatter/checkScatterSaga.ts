import { FrontState } from '../../reducer'
import { put, race, select, take } from 'redux-saga/effects'
import { scatterDuck } from './scatterDuck'

export function* checkScatterSaga() {
  const state: FrontState = yield select()
  if (!state.app.scatter.attached) {
    yield put(scatterDuck.actions.attach.started())

    const { done, failed } = yield race({
      done: take(scatterDuck.actions.attach.done.isType),
      failed: take(scatterDuck.actions.attach.failed.isType),
    })

  }

}
