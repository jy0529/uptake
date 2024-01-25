import { prisma } from './db'
import { Rss } from '@prisma/client'

/**
 * Reads all RSS entries from the database.
 *
 * @return {Rss[]} An array of RSS entries.
 */
const readAllRSS = async (): Promise<Rss[]> => {
  return await prisma.rss.findMany()
}

/**
 * Adds a new RSS feed to the database.
 *
 * @param {string} name - The name of the RSS feed.
 * @param {string} rssSource - The source URL of the RSS feed.
 * @return {Rss}
 */
const addRSS = async (name: string, rssSource: string): Promise<Rss> => {
  const newRss = await prisma.rss.create({
    data: {
      name,
      rssSource
    }
  })
  return newRss
}
export { readAllRSS, addRSS }
