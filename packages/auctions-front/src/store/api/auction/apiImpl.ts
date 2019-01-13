import { APIConfig, APIResponse } from '../APITypes'
import ScatterJS from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs'
import eosjs from 'eosjs'
import { ScatterAttachResponse, ScattetDetachResponse } from '../scatter/types'
import { Eos } from '../../../utils/eos'
import { AuctionVO } from './auctionApi'
import { SellModel } from '../../btce/dome/domeDuck'

export default (config: APIConfig) => ({


  fetchRecentAuctions: async (): Promise<APIResponse<AuctionVO[]>> => {

    const myEosjs = new Eos()
    const auctionsLowerBound = ''

    try {

      const auctionsTable = await myEosjs.getTableRows(auctionsLowerBound, 'accounts')
      const extrasTable = await myEosjs.getTableRows(auctionsLowerBound, 'extras')

      return {
        result: auctionsTable.rows.map((row, index) => {
          return {
            id: 1,
            name: row.account4sale,
            ask: row.saleprice,
            dislikes: extrasTable.rows[index].numberofvotes,
            message: extrasTable.rows[index].message,
          }
        }),
      }

    } catch (e) {
      return { errors: e }
    }
  },

  submitSell: async (value: SellModel): Promise<APIResponse<boolean>> => {
    try {
      const eosScatter = ScatterJS.scatter.eos(Eos.networkScatter, eosjs, Eos.defaultConfig())

      await _updateAuth(eosScatter, value)
      await _sellAction(eosScatter, value)

      return { result: true }
    } catch (e) {
      console.log('errors selling: ', e)
      return { errors: e}
    }
  },

})


const _updateAuth = async (eosScatter, value) => {
  console.log('Starting update auth')
  const eosio = await eosScatter.contract('eosio')

  const account = ScatterJS.scatter.identity.accounts.find(
    x => x.blockchain === 'eos',
  )
  if (account.name !== value.name)
    throw `the name in the form is different than in your identity in scatter: ${account.name} != ${value.name}`

  console.log('names:', account.name, ' : ', value.name)

  const accountOwnerKey = await _getAccountInfo(eosScatter, value.name)
    .then(res => res.permissions.find(it => it.perm_name === 'owner').required_auth.keys[0].key)

  const authCode = {
    threshold: 1,
    keys: [{
      key: accountOwnerKey,
      weight: 1,
    }],
    waits: [],
    accounts: [{
      permission: { actor: Eos.contractAccount, permission: 'eosio.code' },
      weight: 1,
    }],
  }

  const eosioCallback = await eosio.updateauth({
    account: value.name,
    permission: 'owner',
    parent: '',
    auth: authCode,
  },
  { // only the account4sale@owner can sell
    authorization: [{
      actor: value.name,
      permission: 'owner',
    }],
  })

  console.log('eosioCallback:', eosioCallback)
  return eosioCallback
}

const _sellAction = async (eosScatter, value) => {
  const contract = await eosScatter.contract(Eos.contractAccount)
  const actionCallback = await contract.sell(
    {
      account4sale: value.name,
      saleprice: value.ask + '.0000 EOS', // todo: add mask in a form
      paymentaccnt: value.receivingAccount,
      message: value.message,
    },
    { // only the account4sale@owner can sell
      authorization: [{
        actor: value.name,
        permission: 'owner',
      }],
    })

  console.log('the account is on sale now!:', actionCallback)
}


const _voteAction = async (eosScatter, value) => {
  const voterAccount = 'arealgangsta'
  const sellingAccount = 'nameswapsln2'
  const contract = await eosScatter.contract(Eos.contractAccount)
  const actionCallback = await contract.vote(
    {account4sale: sellingAccount, voter: voterAccount},
    { authorization: [voterAccount] })

  console.log('_voteAction result', actionCallback)
  return actionCallback
}

const _getAccountInfo = async (eosScatter, name): Promise<ScatterAttachResponse> => {
  try {
    return eosScatter.getAccount(name)
  } catch (e) {
    return { errors: e }
  }
}