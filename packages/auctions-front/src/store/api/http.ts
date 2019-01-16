import axios, { AxiosPromise } from 'axios'
import { isArray } from '@sha/utils'


export const EOSPlorerBaseURL = 'http://94.130.19.172/api/v1/'
export const http = axios.create({baseURL: EOSPlorerBaseURL})

export const handleResponse = async <T>(promise: AxiosPromise<{data: T}>, mapper: {(value: T): T} = (value: T) => value) => {
  try {
    let result = (await promise).data.data
    if (isArray(result))
      result = result.map(mapper)

    result = mapper(result)

    return {result}
  } catch (e) {
    return {errors: e, result: undefined}
  }
}
