import { Tag } from './Tag'

export interface Subscriber {
  id: number
  name: string
  rssSource: string
  tag: Tag
}