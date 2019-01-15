import { APIResponse } from '../APITypes'

export type ScatterActionResponse = APIResponse<true>

/**
 * Scatter detached
 */
export type ScattetDetachResponse = ScatterActionResponse


/**
 * Scatter attached
 */
export type ScatterAttachResponse = APIResponse<{
    account: string
    permissions: Array<any>
    balanceEOS: number
}>

