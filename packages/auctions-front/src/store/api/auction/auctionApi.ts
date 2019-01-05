import { APIConfig, APIMode } from '../APITypes'
import mockImpl from './mockImpl'
import apiImpl from './apiImpl'
import confirmImpl from './confirmImpl'

const defaultConfig = {
  mode: 'mock' as APIMode,
}

export const auctionApi = (config: APIConfig = defaultConfig) => {
  if (config.mode === 'mock')
    return mockImpl(config)

  if (config.mode === 'confirm')
    return confirmImpl(config)

  return {...mockImpl(config), ...apiImpl(config)}
}


/**
 * Unique identifier for entities.
 * Because of scalable reasons - string countains guid, increment id or whatever easy to implement by backend
 */
type ID = string

/**
 * The date is number every where.
 * Date is UTC ? hope so. How to display one depending on user's time zone ?
 * TODO: discuss, could have a humanized format for debug reasons
 */
type Date = number

export type AuctionVO = {
  /**
   * I need a unique Identifier to forward users to related pages.
   * I.E. certain page of auction (just name & suffix info is not enoght)
   */
  id: ID

  /**
   *  Name to sell, min - 1, max 12
   */
  name: string

  /**
   * The minimum value to close auction, could be unset ?
   */
  ask: number

  /**
   * the latest best bid, could be unset
   */
  bestBid?: number

  /**
   * Auction initialization date
   */
  publishedOn: Date

  /**
   * Duration, after one auction is automatically closed.
   * Required, i hope so, because default duration could be changed later, And front-end could have no info about
   */
  duration: Date

  /**
   * Have no any idea what is it
   */
  dislikes: number

  /**
   * An optional field
   */
  message?: string
}
