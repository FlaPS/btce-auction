import { APIConfig, APIResponse } from '../APITypes'
import ScatterJS from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs'
import eosjs from 'eosjs'
import { ScatterAttachResponse, ScattetDetachResponse } from '../scatter/types'
import { Eos } from '../../../utils/eos'

export default (config: APIConfig) => ({

  attach: async (): Promise<ScatterAttachResponse> => {

    console.log('attach scatter')

    ScatterJS.plugins(new ScatterEOS())


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
    console.log('connected: ', isConnected)

    const scatter = ScatterJS.scatter
    const requiredFields = { accounts: [network] }

    const response = await scatter
      .getIdentity(requiredFields) // todo: @deprecated - Use `login(requiredFields)`?
      .then(() => {
        const account = scatter.identity.accounts.find(
          x => x.blockchain === 'eos',
        )

        console.log('account:', account)
        // todo: ask for account.name info using eosjs and fetch account data (ram ect)
        // eosjs.getAccount(account.name)

        return { result: { account: account.name } }
      })
      .catch(error => {
        // The user rejected this request, or doesn't have the appropriate requirements.
        console.error('error getIdentity', error)
        // todo: show alarm window with erreor message

        return { result: { errors: [error] }}

      })
      .finally(() => { // todo: delete
        ScatterJS.scatter.forgetIdentity()
      })


    return response

  },
  detach: async (): Promise<ScattetDetachResponse> => {

    await ScatterJS.scatter.forgetIdentity()
    return {
      result: true,
    }
  },
})
