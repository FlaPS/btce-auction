import mockImpl from './mockImpl'
import { APIConfig } from '../APITypes'


const confirmImpl = (config: APIConfig) =>
  Object
    .entries(mockImpl(config))
    .reduce(
      (result, [key, value]) =>
        ({
          ...result,
          [key]: async (params?) => {
            // @ts-ignore
            const result = await value(params)
            if (window.confirm('call method ' + key + ', returns ' + JSON.stringify(result)))
              return result
            return {
              errors: ['Scatter refused'],
            }
          },
        }),
      {} as any ,
  )
export default confirmImpl
