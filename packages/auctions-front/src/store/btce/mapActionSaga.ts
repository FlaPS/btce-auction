import { FactoryAnyAction } from '@sha/fsa'
import { put, takeEvery } from 'redux-saga/effects'

export function* mapActionSaga<P1, P2>(pattern: (source: FactoryAnyAction) => boolean, actionMapper: (action: FactoryAnyAction) => FactoryAnyAction) {
  function* dispatchMappedAction(source: FactoryAnyAction) {
    yield put(actionMapper(source))
  }

  yield takeEvery(pattern, dispatchMappedAction)
}
