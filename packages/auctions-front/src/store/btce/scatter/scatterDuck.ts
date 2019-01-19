import { actionCreatorFactory, AsyncState, isType } from '@sha/fsa'
import { ScatterActionResponse, ScatterAttachResponse } from '../../api/scatter/types'
import { AccountInfoVO } from '../../api/explorer/accounts'

const factory = actionCreatorFactory('scatter')

const actions = {
  attach: factory.async<undefined, ScatterAttachResponse>('attach'),
  detach: factory.async('detach'),
}

export type ScatterState = Partial<{
    scatterData: ScatterAttachResponse
    attached: boolean
  }
>

const reducer = (state: ScatterState = {attached: false, scatterData: {}}, action) => {
  if (actions.attach.done.isType(action)) {
    state = {
      scatterData: action.payload.result,
      attached: true,
    }
  } else if (actions.detach.done.isType(action)) {
    state = {
      scatterData: {},
      attached: false,
    }
  }

  return state
}


export const scatterDuck = {
  selectors: {
    scatter: (state: any): ScatterState => state.app.scatter,
  },
  reducer,
  actions,
}
