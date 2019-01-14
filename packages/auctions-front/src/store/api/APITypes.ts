import { AssociativeArray } from '@sha/utils'

export type APIMode = 'api' | 'confirm' | 'mock'

export type APIConfig = {
  mode: APIMode
  domeGatewayBase?: string
  modes?: AssociativeArray<APIMode>
}

export type APIResponse<T> = {
  result?: T
  errors?: string[]
}


export const defaultAPIConfig = {
  mode: 'mock' as APIMode,
  domeGatewayBase: 'http://94.130.19.172/api/v1/',
}
