import { APIConfig } from '../APITypes'
import ScatterJS from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs'
import { ScatterAttachResponse, ScatterDetachResponse } from '../scatter/types'
import { Eos } from '../../../utils/eos'

export default (config: APIConfig) => ({

  attach: async (): Promise<ScatterAttachResponse> => {
    console.log('attaching scatter')

    try {
      ScatterJS.plugins(new ScatterEOS())

      // if there is no identity but forgetIdentity is called
      // scatter will throw "There is no identity with an account set on your Scatter instance."
      if (ScatterJS.scatter.identity) {
        await ScatterJS.scatter.forgetIdentity()
      } // todo: do not forget

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

      return accountInfo
    } catch (e) {
      // The user rejected this request, or doesn't have the appropriate requirements
      console.log('error scatter:', e)

      if (ScatterJS.scatter.identity) {
        await ScatterJS.scatter.forgetIdentity()
      }

      return { errors: [e] }
    }
  },

  detach: async (): Promise<ScatterDetachResponse> => {

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
