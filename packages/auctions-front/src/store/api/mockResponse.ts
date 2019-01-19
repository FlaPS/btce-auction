import { sleep } from '@sha/utils'


type MockGenerator<T, D> = (request?: D) => T

export const mockResponse = async <T, D>(mockGenerator: MockGenerator<T, D>) =>
  async (request?: D) => {
    await sleep(Math.random() + 500)
    const result = mockGenerator(request)
    return {
      result,
    }
  }

export const mockTrueResponse = mockResponse(() => true)
