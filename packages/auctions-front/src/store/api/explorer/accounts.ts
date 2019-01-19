import createApi from '../createApi'
import { mockResponse } from '../mockResponse'
import { handleResponse, http } from '../http'
import { ProxyRow } from './proxies'


export const accountApi = {
  getAccountInfo: (accountName: string) => handleResponse<AccountInfoVO>(
    http.get('accounts/' + accountName),
    data => ({
      ...data,
      availableEOS: Number(String(data.availableEOS).split(' ')[0]),
    }),
  ),

}


export const accountInfoMock = {
  'availableEOS': 0,
  'totalRAM': 4456,
  'usedRAM': 2960,
  'totalCPU': 0,
  'usedCPU': 2832,
  'totalNET': 0,
  'usedNET': 265,
  'totalStakedResources':
    {
      'totalStakedCPU': '0.0000 EOS',
      'totalStakedNET': '0.0000 EOS',
    },
  'selfStakedResources':
    {
      'selfStakedCPU': 0,
      'selfStakedNET': 0,
    },
}

export type AccountInfoVO = typeof accountInfoMock
