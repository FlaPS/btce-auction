import { handleResponse, http } from '../http'


export const tokensApi = {
    getAll: () => handleResponse<TokenRow[]>(http.get('tokens')),
}


export interface TokenRow {
  name: string
  logo: string
  logo_lg: string
  symbol: string
  account: string
  supply: string
  max_supply: string
  issuer: string
  ['24h_volume']: number
  cur_price: number
  volume: number
  volume_eos: number
  price_change_24h_perc: number
  market_cap: number
}


