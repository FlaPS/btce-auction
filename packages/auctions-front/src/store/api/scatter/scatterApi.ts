import { APIConfig, APIMode } from '../APITypes'
import mockImpl from './mockImpl'
import scatterImpl from './apiImpl'
import confirmImpl from './confirmImpl'

const defaultScatterConfig = {
  mode: 'mock' as APIMode,
}

export const scatterApi = (config: APIConfig = defaultScatterConfig) => {
  if (config.mode === 'mock')
    return mockImpl(config)

  if (config.mode === 'confirm')
    return confirmImpl(config)

  return {...mockImpl(config), ...scatterImpl(config)}
}

