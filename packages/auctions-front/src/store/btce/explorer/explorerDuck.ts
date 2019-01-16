import { actionCreatorFactory, AsyncState } from '@sha/fsa/src'
import { ProducerRow } from '../../api/explorer/producers'
import { BlockRow } from '../../api/explorer/blocks'
import { TransactionTraceRow } from '../../api/explorer/transactions'
import { combineReducers } from 'redux'

const factory = actionCreatorFactory('explorer')

const actions = {
  fetchProducers: factory.async<undefined, ProducerRow[]>('fetchProducers'),
  fetchBlocks: factory.async<undefined, BlockRow[]>('fetchBlocks'),
  fetchTransactions: factory.async<undefined, TransactionTraceRow[]>('fetchTransactions'),
}

const reducer = combineReducers({
  producers: actions.fetchProducers.asyncReducer,
  blocks: actions.fetchBlocks.asyncReducer,
  transactionTraces: actions.fetchTransactions.asyncReducer,
})

export type ExplorerState = {
  producers: AsyncState<ProducerRow[]>
  blocks: AsyncState<BlockRow[]>
  transactionTraces: AsyncState<TransactionTraceRow[]>
}

export const explorerDuck = {
  actions,
  factory,
  reducer,
}
