import { handleResponse, http } from '../http'


export const auctionsApi = {
    getEnded: () => handleResponse<any>(http.get('auctions/ended')),
    getCurrent: () => handleResponse<any>(http.get('auctions/current')),
}

