import { actionCreatorFactory, factoryDelimeter } from '../../../../../fsa/src'
import ABIeosnameswap from './ABIeosnameswap'
import { map } from 'ramda'

type Name = string
type Asset = number

const factory = actionCreatorFactory('eosnameswap')

export const smartContractActions = {

  /**
   * User opens new auction
   */
  sell: factory<{
    account4sale: Name
    saleprice: Asset
    paymentaccnt: Name
    message: string
  }>('sell'),

  cancel: factory<{
    account4sale: Name
    owner_key: string  // WTF ?
    active_key: string // WTF ?
  }>('cancel'),

  /**
   * Update auction
   */
  updatesale: factory<{
    account4sale: Name
    saleprice: Asset  // WTF ?
    message: string // WTF ?
  }>('updatesale'),

  /**
   * User votes ? (dislikes) the auction
   */
  vote: factory<{
    account4sale: Name
    voter: Name
  }>('vote'),

  proposebid: factory<{
    account4sale: Name
    bidprice: Asset
    bidder: Name
  }>('proposebid'),

  decidebid: factory<{
    account4sale: Name
    accept: boolean
  }>('decidebid'),

  message: factory<{
    receiver: Name,
    message: string
  }>('message'),

  screener: factory<{
    account4sale: Name
    option: number
  }>('screener'),

  lend: factory<{
    account4sale: Name
    cpu: Asset
    net: Asset
  }>('lend'),

  regref: factory<{
    reg_name: Name
    reg_account: Name
  }>('regref'),

  initstats: factory('initstats'),
}


export type SmartContractAction =
  | ReturnType<typeof smartContractActions.sell>
  | ReturnType<typeof smartContractActions.cancel>
  | ReturnType<typeof smartContractActions.proposebid>
  | ReturnType<typeof smartContractActions.decidebid>
  | ReturnType<typeof smartContractActions.vote>
  | ReturnType<typeof smartContractActions.updatesale>

export const mapSmartContractActionToStruct = (action: SmartContractAction) => {
  const payload = action.payload
  const [type] = action.type.split(factoryDelimeter)
  const structType =  ABIeosnameswap.actions.find( item => item.name === type)
  const struct = ABIeosnameswap.structs.find(  item => item.name === structType.type)
  const fields = struct.fields

  const toField = field => {

    if (field.type === 'asset')
      return payload[field.name] + ' EOS'

    return payload[field.name]
  }

  const result = map(toField)(fields)

  return result
}

