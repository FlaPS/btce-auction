import {ScatterActionResponse, ScatterAttachResponse, ScatterDetachResponse } from './types'
import { sleep } from '@sha/utils'
import { mapSmartContractActionToStruct, SmartContractAction } from './smartContractActions'
import { APIConfig } from '../APITypes'

export const mockScatterAccountName = 'myname.suffix'

export default (config: APIConfig = {mode: 'mock'}) =>
  ({
    attach: async (): Promise<ScatterAttachResponse> => {

      await sleep(Math.random() * 1000)
      return {
        result: {
          account: mockScatterAccountName,
          permissions: [],
          balanceEOS: 1249.87,
        },
      }
    },

    detach: async (): Promise<ScatterDetachResponse> => {
      await sleep(Math.random() * 1000)
      return {
        result: true,
      }
    },

  })
