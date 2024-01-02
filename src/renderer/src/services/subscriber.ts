import { Subscriber } from '@renderer/models/Subscriber'

export const getAllSubscribers = (): Array<Subscriber> => {
  const subscribers = [
    {
      id: 1,
      name: '掘金热门',
      rssSource: 'https://rsshub.app/juejin/trending/frontend/monthly',
      tag: {
        id: 1,
        name: '编程'
      }
    },
    {
      id: 2,
      name: 'dev.to 热门',
      rssSource: 'https://rsshub.app/dev.to/top/month',
      tag: {
        id: 1,
        name: '编程'
      }
    }
  ]

  return subscribers
}
