import {ScatterActionResponse, ScatterAttachResponse, ScattetDetachResponse } from './types'
import { sleep } from '@sha/utils'
import { mapSmartContractActionToStruct, SmartContractAction } from './smartContractActions'
import { APIConfig } from '../APITypes'

export default (config: APIConfig = {mode: 'mock'}) =>
  ({
    attach: async (): Promise<ScatterAttachResponse> => {

      await sleep(Math.random() * 1000)
      return {
        result: {
          account: 'myname.suffix',
        },
      }
    },

    detach: async (): Promise<ScattetDetachResponse> => {
      await sleep(Math.random() * 1000)
      return {
        result: true,
      }
    },

  })
