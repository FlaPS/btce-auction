import mockImpl from './mockImpl'


const confirImpl = (config) =>
  Object
    .entries(mockImpl(config))
    .reduce(
      (result, [key, value]) =>
        ({
          ...result,
          [key]: async (params?) => {
            const result = await value(params)
            if (window.confirm('call method ' + key + ', returns ' + JSON.stringify(result)))
              return result
            return {
              errors: ['Scatter is not connected'],
            }
          },
        }),
      {},
    )
export default confirImpl
