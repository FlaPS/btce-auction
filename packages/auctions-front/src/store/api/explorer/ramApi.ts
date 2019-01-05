import { handleResponse, http } from '../http'


export const ramApi = {
  getStat: () => handleResponse<RAMStat[]>(http.get('resources/ram_stat')),
}

type RAMStat = {
  ramPrice: number
  totalRam: number
  usedRam: number
}
