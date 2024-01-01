export interface RSSItem {
  author: string
  content: string
  contentSnippet: string
  guid: string
  isoDate: string
  link: string
  pubDate: string
  title: string
}

export interface RSSResponse {
  items: RSSItem[]
  description: string
  feedUrl: string
  generator: string
  language: string
  lasBuildDate: string
  link: string
  title: string
  ttl: string
  webMaster: string
}
