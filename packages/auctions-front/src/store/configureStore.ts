import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { isFrontend } from '@sha/utils'
import createRootReducer from './reducer'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { btceSaga } from './btce/btceSaga'
import { APIMode } from './api/APITypes'


const REDUX_DEV_TOOLS = '__REDUX_DEVTOOLS_EXTENSION__'

const configureFrontendStore = (
  initialState?: any,
  history: ReturnType<typeof createBrowserHistory> = createBrowserHistory(),
  mode: APIMode = 'confirm',
) => {

  const store = createStore(createRootReducer(history), initialState, getFrontEndMiddleware(history))

  store['runSaga'] = sagaMiddleware.run
  store['runSaga'](btceSaga, {mode})
  const dispatch = store.dispatch
  let prevRoute = '?'
  store.dispatch = (action) => {
    if (action.type === '@@router/LOCATION_CHANGE')  {
      if ( prevRoute !== action.payload.location.pathname) {
        prevRoute = action.payload.location.pathname
        dispatch(action)
      }
    } else {
      dispatch(action)
    }
  }

  return store as typeof store & { runSaga: Function, history: any }
}

const sagaMiddleware = createSagaMiddleware()


const getFrontEndMiddleware = (history: any) =>
  isFrontend() && window[REDUX_DEV_TOOLS]
    ?
    compose(
      applyMiddleware(routerMiddleware(history), sagaMiddleware),
      window[REDUX_DEV_TOOLS](),
    )
    :
    compose(
      applyMiddleware(routerMiddleware(history), sagaMiddleware),
    )

export default configureFrontendStore
