import { handleResponse, http } from '../http'


export const proxiesApi = {
    getAll: () => handleResponse<ProxyRow[]>(http.get('proxies')),
}


export interface ProxyRow {
  rank: string;
  logo: string;
  name: string;
  account: string;
  accountEOS: string;
  proxiedEOS: string;
  totalEOS: string;
  proxiedAccounts: string;
  candidateVotes: string;
}


