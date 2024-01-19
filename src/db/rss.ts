import { db } from './db'
export interface RSSRowDesc {
  id: number
  name: string
  rssSource: string
}

/**
 * Reads all RSS entries from the database.
 *
 * @return {RSSRowDesc[]} An array of RSS entries.
 */
const readAllRSS = (): RSSRowDesc[] => {
  try {
    const selectQuery = db.prepare('SELECT * FROM rss')
    const rows = selectQuery.all()
    return rows as RSSRowDesc[]
  } catch (err) {
    console.error(err)
    throw err
  }
}

/**
 * Adds a new RSS feed to the database.
 *
 * @param {string} name - The name of the RSS feed.
 * @param {string} rssSource - The source URL of the RSS feed.
 * @return {void}
 */
const addRSS = (name: string, rssSource: string): void => {
  try {
    const insertQuery = db.prepare(
      `INSERT INTO rss(name, rssSource) VALUES('${name}', '${rssSource}')`
    )
    const transaction = db.transaction(() => {
      insertQuery.run()
    })
    transaction()
  } catch (err) {
    console.error(err)
    throw err
  }
}
export { readAllRSS, addRSS }
