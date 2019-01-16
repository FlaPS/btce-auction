import { APIConfig, APIResponse } from '../../APITypes'
import ScatterJS from 'scatterjs-core'
import eosjs from 'eosjs'
import { ScatterAttachResponse } from '../../scatter/types'
import { Eos } from '../../../../utils/eos'
import { AuctionVO } from '..'
import { MyState, BidModel, SellModel } from '../../../btce/dome/domeDuck'
import { generateUint64Guid } from '@sha/random'

export default (config: APIConfig) => ({

  fetchMyState: async (): Promise<APIResponse<MyState>> => {
    const myState = await auctionState()
    console.log('fetching state:', myState)

    const {auctions, ...state} = myState
    return {
      result: state.my,
    }
  },

  fetchRecentAuctions: async (): Promise<APIResponse<AuctionVO[]>> => {

    try {
      return { result: await _getAuctions() }
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


  // TODO:: it is:: instantBuy
  placeBid: async (value: BidModel): Promise<APIResponse<boolean>> => {
    console.log('start instantBuy')

    try {
      const eosScatter = ScatterJS.scatter.eos(Eos.networkScatter, eosjs, Eos.defaultConfig())
      const buyer = _getAttachedAccount()

      // todo: also search in the bids table
      // todo: search by the auction guid?
      // const myEosJs = new Eos()
      // const priceForTheBuyer = (await myEosJs.getTableRows(buyer, 'accounts', account.name)).saleprice
      // console.log('priceForTheBuyer:', priceForTheBuyer, 'ask:', value.ask)

      // todo: get them from the value.newKeys
      const newKeys = {
        owner: prompt('Enter owner key'), // 'EOS53Ad9acDA2mQZXDGmpJxB5MBopDoLY99qS4RoNs8D2SBXosoJx',
        active:  prompt('Enter active key'), // 'EOS53Ad9acDA2mQZXDGmpJxB5MBopDoLY99qS4RoNs8D2SBXosoJx',
      }

      // if (value.ask === priceForTheBuyer) {
      const buyResult = _buyInstantAction(eosScatter, value, buyer, newKeys)
      console.log('buy result =', buyResult)
      // }

      return { result: true }
    } catch (e) {
      console.log('errors placing bid: ', e)
      return { errors: e}
    }
  },

  cancel: async (value: {auctionId: string, name: string}): Promise<APIResponse<boolean>> => {
    try {
      const eosScatter = ScatterJS.scatter.eos(Eos.networkScatter, eosjs, Eos.defaultConfig())
      const newKeys = { // todo: make a form for a new keys
        owner: prompt('Enter owner key'), // 'EOS53Ad9acDA2mQZXDGmpJxB5MBopDoLY99qS4RoNs8D2SBXosoJx',
        active:  prompt('Enter active key'), // 'EOS53Ad9acDA2mQZXDGmpJxB5MBopDoLY99qS4RoNs8D2SBXosoJx',
      }

      const myAccount = _getAttachedAccount()
      const cancelResult = await _cancelAction(eosScatter, value, newKeys, myAccount)
      console.log('cancel callback:', cancelResult)

      return { result: true}
    } catch (e) {
      return { errors: e }
    }

  },

})


const _updateAuth = async (eosScatter, value) => {
  console.log('Starting update auth')
  const eosio = await eosScatter.contract('eosio')

  const myAccount = _getAttachedAccount()
  if (myAccount.name !== value.name)
    throw `the name in the form is different than your attached identity. Scatter: ${myAccount.name}, Form: ${value.name}`

  let accountOwnerKey = {}

  try {
    accountOwnerKey = await _getAccountInfo(eosScatter, value.name)
      .then(res => res.permissions.find(it => it.perm_name === 'owner').required_auth.keys[0].key)
  } catch (e) {
    throw 'account key is not found: ' + e
  }

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
  }, { // only the account4sale@owner can sell
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
      guid: generateUint64Guid(),
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

const _buyInstantAction = async (eosScatter, value: BidModel, buyer, newKeys) => {
  const eosioToken = await eosScatter.contract('eosio.token')
  const buyResult = await eosioToken.transfer({
      from: buyer,
      to: Eos.contractAccount,
      quantity: value.bidAmount + '.0000 EOS', // todo: add mask in the frontend
      memo: `sp:${value.auctionId},${newKeys.owner},${newKeys.active}`,
    }, {
      authorization: [{
        actor: buyer.name,
        permission: buyer.authority,
      }],
    })

  console.log('buy callback:', buyResult)
}

const _cancelAction = async (eosScatter, value: {auctionId: string, name: string}, keys, myAccount) => {
  try {
    const contract = await eosScatter.contract(Eos.contractAccount)
    const cancelResult = await contract.cancel({
      guid: value.auctionId, // todo: change to guid
      owner_key: keys.owner,
      active_key: keys.active,
    }, {
      authorization: [{
        actor: myAccount.name,
        permission: myAccount.authority,
      }],
    })
    return cancelResult
  } catch (e) {
    console.log('error cancel', e)
    throw e
  }
}

const _getAttachedAccount = (): {name: string, authority: string} => {
  if (!ScatterJS.scatter.identity)
    throw 'Please attach identity'

  const account = ScatterJS.scatter.identity.accounts.find(
    x => x.blockchain === 'eos',
  )

  return account
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

const _getAuctions = async (auctionsLowerBound = '') => {
  const myEosjs = new Eos()
  const auctionsTable = await myEosjs.getTableRows(auctionsLowerBound, 'accounts')
  const extrasTable = await myEosjs.getTableRows(auctionsLowerBound, 'extras')

  return await auctionsTable.rows.map((row, index) => {
      return {
        id: row.guid,
        name: row.account4sale,
        paymentaccnt: row.paymentaccnt,
        ask: row.saleprice,
        dislikes: extrasTable.rows[index].numberofvotes,
        message: extrasTable.rows[index].message,
      }
  })
}

const populate = async () => {
  try {
    const myEosjs = new Eos()
    const myAccount = _getAttachedAccount()

    const auctions = await _getAuctions()
    console.log('auctions', auctions)

    const bids = (await myEosjs.getTableRows('', 'bids')).rows
      .filter( a => a.bidder === myAccount.name)

    const sells = auctions
      .filter( a => a.paymentaccnt === myAccount.name)
      .map(a => a.id)
    // todo: .filter( a => (a.paymentaccnt === myAccount.name || a.account4sale === myAccount.name)) ?


    const dislikes = [] // todo: there is no such table with all votes in the contract
    // (await myEosjs.getTableRows('', 'vote')).rows.map( a => a.id)

    return {
      auctions,
      my: {
        bids,
        sells,
        dislikes,
      },
    }
  } catch (e) {
    console.log('error populate:', e)
    return null
  }
}

const auctionState = populate
