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

    const contractAccount = 'nameswapsln1'
    const myEosjs = new Eos()
    const auctionsPerPage = 50
    let auctionsLowerBound = ''

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
      console.log('start sell')
      // todo: ask for a permission


      const eosScatter = ScatterJS.scatter.eos(Eos.networkScatter, eosjs, Eos.defaultConfig())

      const contract = await eosScatter.contract(Eos.contractAccount)
      const actionCallback = await contract.sell(
        {
          account4sale: value.name,
          saleprice: value.ask + ' EOS',
          paymentaccnt: value.receivingAccount,
          message: value.message,
        },
        { // only the account4sale@owner can sell
          authorization: [{
            actor: value.name,
            permission: 'owner',
          }],
        })

      console.log('the account is on sale now:', actionCallback)
      return { result: true }

    } catch (e) {
      console.log('errors selling: ', e)
      return { errors: e}
    }

  },

})
