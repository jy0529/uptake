import { Subscriber } from '@renderer/models/Subscriber'

export const getAllSubscribers = (): Array<Subscriber> => {
  return window.RssAPI.readAllRSS()
}
