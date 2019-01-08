import eos from 'eosjs'


export class Eos {

  private readonly config: any
  public api: any
  private contractAccount = 'nameswapsln1'
  private auctionsPerPage = 50


  static keys() {
    return []
  }

  static defaultConfig() {
    return {
      chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473',
      keyProvider: Eos.keys(),         // WIF string or array of keys ..
      httpEndpoint: 'http://jungle2.cryptolions.io:80', // todo: make it as an .env
      expireInSeconds: 60,
      broadcast: true,
      verbose: false,                   // API activity
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

  getTableRows(lb: string, table: string): Promise<any> {
    return this.api.getTableRows({
      json: true,
      scope: this.contractAccount,
      code: this.contractAccount,
      table: table,
      lower_bound: lb,
      limit: this.auctionsPerPage,
  })
  }

}
