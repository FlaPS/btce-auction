import axios from 'axios'

const http = axios.create({baseURL: 'http://94.130.19.172/api/v1/'})

export const auctionApi = {
  fetchRecent: async () =>
    http.
}
