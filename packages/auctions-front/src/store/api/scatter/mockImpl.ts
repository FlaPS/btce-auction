import {ScatterActionResponse, ScatterAttachResponse, ScatterDetachResponse } from './types'
import { sleep } from '@sha/utils'
import { mapSmartContractActionToStruct, SmartContractAction } from './smartContractActions'
import { APIConfig } from '../APITypes'

export const mockScatterAccountName = 'intratraders'

export default (config: APIConfig = {mode: 'mock'}) =>
  ({
    attach: async (): Promise<ScatterAttachResponse> => {

      await sleep(Math.random() * 1000)
      return {
        result: {
          account: mockScatterAccountName,
          permissions: []
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
