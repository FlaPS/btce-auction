import { APIConfig } from '../APITypes'
import ScatterJS from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs'
import eosjs from 'eosjs'
import { ScatterAttachResponse, ScattetDetachResponse } from '../scatter/types'
import { Eos } from '../../../utils/eos'
import my from '../../btce/dome/my'

export default (config: APIConfig) => ({


  attach: async (): Promise<ScatterAttachResponse> => {
    console.log('attach scatter')

    try {
      ScatterJS.plugins(new ScatterEOS())

      // if there is no identity but forgetIdentity is called
      // scatter will throw "There is no identity with an account set on your Scatter instance."
      await ScatterJS.scatter.forgetIdentity() // todo: do not forget

      const appName = 'eosnamesbids'
      const isConnected = await ScatterJS.scatter.connect(appName)

      if (!isConnected)
        return { errors: ['scatter is not connected']}

      const scatter = ScatterJS.scatter
      const requiredFields = { accounts: [Eos.networkScatter] }

      await scatter.getIdentity(requiredFields)
      const account = scatter.identity.accounts.find(
        x => x.blockchain === 'eos',
      )
      const accountInfo = await _getAccountInfo(account.name)
      console.log('accinf', accountInfo)


      // dislikes part
      // const eosScatter = scatter.eos(Eos.networkScatter, eosjs, Eos.defaultConfig())
      // const myEosjs = new Eos()
      //
      // const voterAccount = 'arealgangsta'
      // const sellingAccount = 'nameswapsln2'
      // const contract = await eosScatter.contract(myEosjs.contractAccount)
      // const actionCallback = await contract.vote(
      //   {account4sale: sellingAccount, voter: voterAccount},
      //   { authorization: [voterAccount] })

      // const auctionsTable = await eosScatter.getTableRows({
      //   json: true,
      //   // scope: 'eosnamesbids',
      //   // code: 'eosnamesbids',
      //   scope: myEosjs.contractAccount,
      //   code: myEosjs.contractAccount,
      //   table: 'accounts',
      // })


      return accountInfo
    } catch (e) {
      // The user rejected this request, or doesn't have the appropriate requirements
      console.log('error scatter:', e)
      return { errors: [e] }
    }
  },

  detach: async (): Promise<ScattetDetachResponse> => {

    await ScatterJS.scatter.forgetIdentity()
    return {
      result: true,
    }
  },
})

const _getAccountInfo = async (name): Promise<ScatterAttachResponse> => {
  const myEosjs = new Eos()

  try {
    const accountInfo = await myEosjs.api.getAccount(name)
    return { result: { account: accountInfo } }
  } catch (e) {
    return { errors: e }
  }
}
