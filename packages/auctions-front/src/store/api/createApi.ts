import { APIConfig, defaultAPIConfig } from './APITypes'

/**
 * Create api, where mock and api impls are merged
 * @param mockImpl
 * @param apiImpl
 */
export default <M extends I, I extends EmptyApi>(
  mockImpl: APIStrategy<M>,
  apiImpl: APIStrategy<I> = emptyApiImpl as any as APIStrategy<I>,
  configEntry?: string,
) =>
  (config: APIConfig = defaultAPIConfig): M => {
    const configWithMode = (configEntry && config.modes[configEntry])
      ? {...config, mode: config.modes[configEntry]}
      : config

    const mockImplConfigured = mockImpl(configWithMode)
    if (configWithMode.mode === 'mock')
        return mockImplConfigured

    if (configWithMode.mode === 'confirm')
        return confirmImpl(mockImplConfigured)(configWithMode)

    return { ...mockImplConfigured, ...apiImpl(configWithMode) }
  }


type APIStrategy<T = {}> = (config?: APIConfig) => T

type EmptyApi = {}

const emptyApiImpl = (config: APIConfig) => ({})

const confirmImpl = <T>(mockImplConfogured: T) => (config: APIConfig) =>
  Object
    .entries(mockImplConfogured)
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
      {} as any,
    ) as any as ReturnType<APIStrategy<T>>
