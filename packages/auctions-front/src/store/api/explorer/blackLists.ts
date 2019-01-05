import { handleResponse, http } from '../http'


export const blackListsApi = {
    getAll: () => handleResponse<BlackListRow[]>(http.get('black_lists')),
}

export interface BlackListRow {
  id: number;
  order_name: string;
  order_url: string;
  order_hash: string;
  action: string;
  type: string;
  accounts: string[];
}
