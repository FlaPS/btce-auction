import createApi from '../createApi'
import { mockResponse } from '../mockRecponse'


export default createApi(
  // mock
  () => ({
    getAccountInfo: mockResponse(
      (accountName: string) => ({
        'availableEOS': 0,
        'totalRAM': 4456,
        'usedRAM': 2960,
        'totalCPU': 0,
        'usedCPU': 2832,
        'totalNET': 0,
        'usedNET': 265,
        'totalStakedResources':
          {
            'totalStakedCPU': '0.0000 EOS',
            'totalStakedNET': '0.0000 EOS',
          },
        'selfStakedResources':
          {
            'selfStakedCPU': 0,
            'selfStakedNET': 0,
          },
      }),
    ),
  }),

  // api
)
