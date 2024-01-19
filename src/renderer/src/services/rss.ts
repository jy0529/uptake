import { RSSResponse } from '@renderer/models/RSS'
import Parser from 'rss-parser/dist/rss-parser.js'

const rssParser = new Parser({
  customFields: {
    item: [
      'thumb',
      'image',
      ['content:encoded', 'fullContent'],
      ['media:content', 'mediaContent', { keepArray: true }]
    ]
  }
})

export const readRSS = async (url: string): Promise<RSSResponse> => {
  return await rssParser.parseURL(url)
}
