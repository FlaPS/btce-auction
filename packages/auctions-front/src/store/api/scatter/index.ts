import mockImpl from './mockImpl'
import apiImpl from './apiImpl'
import createApi from '../createApi'

export const scatterApi = createApi(mockImpl, apiImpl)
