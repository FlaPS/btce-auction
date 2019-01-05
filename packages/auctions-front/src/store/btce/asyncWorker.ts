import { AsyncActionCreators, FactoryAnyAction, isType } from '@sha/fsa'
import { APIResponse } from '../api/APITypes'
import { call, put, race, select, take, takeEvery } from 'redux-saga/effects'
import { uiDuck } from './ui/uiDuck'
import { scatterDuck } from './scatter/scatterDuck'

const log = console.info

export function* asyncWorker<P, S, E>(actionCreators: AsyncActionCreators<P, S, E>,
                                      method: (p?: any) => Promise<any>,
                                      requireScatter: boolean = false,
) {
  function* callApi(action: FactoryAnyAction) {

    log('calling auction method', method.name, ' params', action.payload)

    if (requireScatter && scatterDuck.actions.attach !== actionCreators as any) {
      const state = yield select()
      if (!state.app.scatter.attached) {
        yield put(scatterDuck.actions.attach.started())

        const { done, failed } = yield race({
          done: take(scatterDuck.actions.attach.done.isType),
          failed: take(scatterDuck.actions.attach.failed.isType),
        })

        if (failed) {
          yield put(
            actionCreators.failed(
              {
                params: action.payload,
                error: 'No scatter attached',
              },
            ),
          )
          return
        }
      }
    }


    yield put(uiDuck.actions.busy(JSON.stringify(action)))

    try {
      const response: APIResponse<any> = yield call(method, action.payload)
      if (response.errors && response.errors.length)
        yield put(
          actionCreators.failed(
            {
              params: action.payload,
              error: response.errors[0],
            },
          ),
        )
      else
        yield put(
          actionCreators.done(
            {
              params: action.payload,
              result: response.result,
            },
          ),
        )
    } catch (e) {
      actionCreators.failed(
        {
          params: action.payload,
          error: e,
        },
      )
    }

    yield put(uiDuck.actions.unbusy(JSON.stringify(action)))
  }
  yield takeEvery(isType(actionCreators.started), callApi)

}
