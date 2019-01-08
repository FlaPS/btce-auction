import { APIConfig, APIResponse } from '../APITypes'
import ScatterJS from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs'
import eosjs from 'eosjs'
import { ScatterAttachResponse, ScattetDetachResponse } from '../scatter/types'
import { Eos } from '../../../utils/eos'
import { AuctionVO } from './auctionApi'

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

    // todo: leave how it was ie
    // return {
    //   result: auctionState.auctions,
    // }
  },
})
