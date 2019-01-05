
export type APIMode = 'api' | 'confirm' | 'mock'

export type APIConfig = {
  mode: APIMode
}

export type APIResponse<T> = {
  result?: T
  errors?: string[]
}
