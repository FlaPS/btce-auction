import { handleResponse, http } from '../http'
import {map} from 'ramda'
import { mergeProps } from '../mergeProps'

const skipColonToNumber = (value: string | number) =>
  (value && typeof value === 'string')
    ? Number(value.split(',').join(''))
    : undefined


export const proxiesApi = {
    getAll: () => handleResponse<ProxyRow[]>(
        http.get('proxies'),
        map(
          mergeProps<ProxyRow>(
            {
              rank: Number,
              candidateVotes: Number,
              proxiedAccounts: Number,
              accountEOS: skipColonToNumber,
              totalEOS: skipColonToNumber,
              proxiedEOS: skipColonToNumber,
            },
          ),
        ),
      ),
}


export interface ProxyRow {
  rank: number
  logo: string
  name: string
  account: string
  accountEOS: number
  proxiedEOS: string
  totalEOS: string
  proxiedAccounts: number
  candidateVotes: number
}


