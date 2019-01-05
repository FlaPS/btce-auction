import { handleResponse, http } from '../http'


export const blocksApi = {
    getAll: () => handleResponse<BlockRow[]>(http.get('blocks')),
}


export interface Authorization {
  actor: string;
  permission: string;
}

export interface Data {
  from: string;
  to: string;
  quantity: string;
  memo: string;
  account: string;
  protection?: number;
  referrer: string;
}

export interface Action {
  account: string;
  name: string;
  authorization: Authorization[];
  data: Data;
  hex_data: string;
}

export interface Transaction2 {
  expiration: Date;
  ref_block_num: number;
  ref_block_prefix: any;
  max_net_usage_words: number;
  max_cpu_usage_ms: number;
  delay_sec: number;
  context_free_actions: any[];
  actions: Action[];
  transaction_extensions: any[];
}

export interface Trx {
  id: string;
  signatures: string[];
  compression: string;
  packed_context_free_data: string;
  context_free_data: any[];
  packed_trx: string;
  transaction: Transaction2;
}

export interface Transaction {
  status: string;
  cpu_usage_us: number;
  net_usage_words: number;
  trx: Trx;
}

export interface Block {
  new_producers?: any
  header_extensions: any[]
  transactions: Transaction[]
  block_extensions: any[]
  timestamp: Date
  producer: string
  confirmed: number
  previous: string
  transaction_mroot: string
  action_mroot: string
  schedule_version: number
  producer_signature: string
}

export interface BlockRow {
  block: Block
  _id: string
  block_id: string
  block_num: number
  createdAt: Date
  num_transactions: number
  num_actions: number
}

