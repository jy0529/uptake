import SQLite3 from 'better-sqlite3'
import path from 'path'

const db: SQLite3.Database = new SQLite3(
  process.env.NODE_ENV === 'development'
    ? './uptake.db'
    : path.join(process.resourcesPath, './uptake.db'),
  { verbose: console.log }
)
db.pragma('journal_mode = WAL')
const createTable =
  "CREATE TABLE IF NOT EXISTS rss('id' INTEGER PRIMARY KEY AUTOINCREMENT, 'name' TEXT, 'rssSource' TEXT)"

db.exec(createTable)

export { db }
