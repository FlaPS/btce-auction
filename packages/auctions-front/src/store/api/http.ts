import axios, { AxiosPromise } from 'axios'

export const http = axios.create({baseURL: 'http://94.130.19.172/api/v1/'})

export const handleResponse = async <T>(promise: AxiosPromise<{data: T}>) =>
  (await promise).data.data
