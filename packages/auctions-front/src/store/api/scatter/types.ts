import { APIResponse } from '../APITypes'

export type ScatterActionResponse = APIResponse<true>

/**
 * Scatter detached
 */
export type ScatterDetachResponse = ScatterActionResponse

/**
 * Scatter attached
 */
export type ScatterAttachResponse = {
    account: string
    permissions: Array<any>
}

