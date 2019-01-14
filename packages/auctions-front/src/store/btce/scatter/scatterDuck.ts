import { actionCreatorFactory, isType } from '@sha/fsa'
import { ScatterActionResponse } from '../../api/scatter/types'

const factory = actionCreatorFactory('scatter')

const actions = {
  attach: factory.async<undefined, ScatterActionResponse>('attach'),
  detach: factory.async('detach'),
}

export type ScatterState = Partial<
  & ScatterActionResponse
  & {
    attached: boolean
  }
>

const reducer = (state: ScatterState = {attached: false}, action) => {
  if (actions.attach.done.isType(action)) {
    state = {
      ...action.payload.result,
      attached: true,
    }
  } else if (actions.detach.done.isType(action)) {
    state = {
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
