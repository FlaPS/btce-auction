import { APIConfig } from '../APITypes'
import ScatterJS from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs'
import eosjs from 'eosjs'
import { ScatterAttachResponse, ScattetDetachResponse } from '../scatter/types'
import { Eos } from '../../../utils/eos'

export default (config: APIConfig) => ({

  attach: async (): Promise<ScatterAttachResponse> => {


    ScatterJS.plugins(new ScatterEOS())
    await ScatterJS.scatter.forgetIdentity()

    const jungleTestnetChainId = 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473'
    const mainnetChainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
    // todo: make it as a constant depending on env
    const chainId = jungleTestnetChainId

    const network = {
      blockchain: 'eos',
      protocol: 'https',
      chainId,
      host: 'nodes.get-scatter.com',
      port: 443,
    }

    const appName = 'eosbidnames'
    const isConnected = await ScatterJS.scatter.connect(appName)

    if (!isConnected)
      return { errors: ['scatter is not connected']}

    const scatter = ScatterJS.scatter
    const requiredFields = { accounts: [network] }

    try {
      await scatter.getIdentity(requiredFields)

      const account = scatter.identity.accounts.find(
        x => x.blockchain === 'eos',
      )
      const accountInfo = await _getAccountInfo(account.name)
      console.log('accinf', accountInfo)

      return accountInfo
    } catch (e) {
      // The user rejected this request, or doesn't have the appropriate requirements
      return { errors: [e] }
    }

  },

  detach: async (): Promise<ScattetDetachResponse> => {

    console.log('detach scatter')
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
