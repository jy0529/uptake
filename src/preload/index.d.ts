import { ElectronAPI } from '@electron-toolkit/preload'
import { Rss } from '@prisma/client'

declare global {
  interface Window {
    electron: ElectronAPI
    RssAPI: {
      addRSS: (name: string, rssSource: string) => Promise<Rss>
      readAllRSS: () => Promise<Rss[]>
    }
  }
}
