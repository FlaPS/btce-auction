import eos from 'eosjs'
import ScatterEOS from 'scatterjs-plugin-eosjs'
import ScatterJS from 'scatterjs-core'
import eosjs from 'eosjs'


export class Eos {

  private readonly config: any
  public api: any
  public static contractAccount = 'nameswapsab1'
  public auctionsPerPage = 50
  public scatter

  static keys() {
    return []
  }

  private static chainId = {
    jungleTestnet: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
    mainnet: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  }

  private static host = {
    jungleTestnet: 'jungle2.cryptolions.io',
    mainnet: 'nodes.get-scatter.com',
  }

  public static networkScatter = {
    blockchain: 'eos',
    protocol: 'https',
    chainId: Eos.chainId.jungleTestnet,
    host: Eos.host.jungleTestnet,
    port: 443,
  }

  static defaultConfig() {
    return {
      chainId: this.chainId.jungleTestnet,
      keyProvider: Eos.keys(),         // WIF string or array of keys ..
      // signatureProvider: ScatterJS.scatter.eosHook(Eos.networkScatter),
      httpEndpoint: 'http://jungle2.cryptolions.io:80', // todo: make it as an .env
      expireInSeconds: 60,
      broadcast: true,
      verbose: true,                   // API activity
      sign: true,
      logger: {
        log: null,   // set console.log to show
        error: null, // set console.error to show
      },
    }
  }


  constructor(config?) {
    this.config = config ? config : Eos.defaultConfig()
    this.api = eos(this.config)
  }

  getTableRows(lb: string, table: string, ub: string = ''): Promise<any> {
    return this.api.getTableRows({
      json: true,
      scope: Eos.contractAccount,
      code: Eos.contractAccount,
      table: table,
      lower_bound: lb,
      upper_bound: ub,
      limit: this.auctionsPerPage,
    })
  }


}
