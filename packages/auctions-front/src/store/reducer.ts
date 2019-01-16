import { combineReducers } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import { BTCEAppState, btceDuck } from './btce/btceDuck'
import { uiDuck, UIState } from './btce/ui/uiDuck'

type DeepReadonly<T> = T extends any[]
  ? DeepReadonlyArray<T[number]>
  : T extends object ? DeepReadonlyObject<T> : T

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {
}

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}

const reducer = (history: History) => combineReducers({
  router: connectRouter(history),
  app: btceDuck.reducer,
  ui: uiDuck.reducer,
})

export type FrontState = {
  app: BTCEAppState,
  router: RouterState,
  ui: UIState,
}

export default reducer
