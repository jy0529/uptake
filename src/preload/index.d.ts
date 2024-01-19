import { ElectronAPI } from '@electron-toolkit/preload'
import { RSSRowDesc } from '../db/rss'

declare global {
  interface Window {
    electron: ElectronAPI
    RssAPI: {
      addRSS: (name: string, rssSource: string) => void
      readAllRSS: () => RSSRowDesc[]
    }
  }
}
