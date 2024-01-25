import { Rss } from '@prisma/client'

export const getAllSubscribers = async (): Promise<Rss[]> => {
  return await window.RssAPI.readAllRSS()
}
