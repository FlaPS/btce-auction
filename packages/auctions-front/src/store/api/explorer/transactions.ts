import { handleResponse, http } from '../http'


export const transactionsApi = {
  getAll: () => handleResponse<TransactionTraceRow[]>(http.get('transactions')),
}


  export interface Receipt {
    receiver: string;
    act_digest: string;
    global_sequence: number;
    recv_sequence: number;
    auth_sequence: any[][];
    code_sequence: number;
    abi_sequence: number;
  }

  export interface Authorization {
    actor: string;
    permission: string;
  }

  export interface Act {
    account: string;
    name: string;
    authorization: Authorization[];
    data: any;
    hex_data: string;
  }

  export interface AccountRamDelta {
    account: string;
    delta: number;
  }

  export interface Receipt2 {
    receiver: string;
    act_digest: string;
    global_sequence: number;
    recv_sequence: number;
    auth_sequence: any[][];
    code_sequence: number;
    abi_sequence: number;
  }

  export interface Authorization2 {
    actor: string;
    permission: string;
  }

  export interface Data {
    from: string;
    to: string;
    quantity: string;
    memo: string;
  }

  export interface Act2 {
    account: string;
    name: string;
    authorization: Authorization2[];
    data: Data;
    hex_data: string;
  }

  export interface AccountRamDelta2 {
    account: string;
    delta: number;
  }

  export interface Receipt3 {
    receiver: string;
    act_digest: string;
    global_sequence: number;
    recv_sequence: number;
    auth_sequence: any[][];
    code_sequence: number;
    abi_sequence: number;
  }

  export interface Authorization3 {
    actor: string;
    permission: string;
  }

  export interface Data2 {
    from: string;
    to: string;
    quantity: string;
    memo: string;
  }

  export interface Act3 {
    account: string;
    name: string;
    authorization: Authorization3[];
    data: Data2;
    hex_data: string;
  }

  export interface InlineTrace2 {
    receipt: Receipt3;
    act: Act3;
    context_free: boolean;
    elapsed: number;
    console: string;
    trx_id: string;
    block_num: number;
    block_time: Date;
    producer_block_id: string;
    account_ram_deltas: any[];
    except?: any;
    inline_traces: any[];
  }

  export interface InlineTrace {
    receipt: Receipt2;
    act: Act2;
    context_free: boolean;
    elapsed: number;
    console: string;
    trx_id: string;
    block_num: number;
    block_time: Date;
    producer_block_id: string;
    account_ram_deltas: AccountRamDelta2[];
    except?: any;
    inline_traces: InlineTrace2[];
  }

  export interface ActionTrace {
    receipt: Receipt;
    act: Act;
    context_free: boolean;
    elapsed: number;
    console: string;
    trx_id: string;
    block_num: number;
    block_time: Date;
    producer_block_id: string;
    account_ram_deltas: AccountRamDelta[];
    except?: any;
    inline_traces: InlineTrace[];
  }

  export interface Receipt4 {
    status: string;
    cpu_usage_us: number;
    net_usage_words: number;
  }

  export interface TransactionTraceRow {
    action_traces: ActionTrace[];
    _id: string;
    id: string;
    block_num: number;
    block_time: Date;
    producer_block_id: string;
    receipt: Receipt4;
    elapsed: number;
    net_usage: number;
    scheduled: boolean;
    except?: any;
    createdAt: Date;
  }


