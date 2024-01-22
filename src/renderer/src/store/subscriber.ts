import { create } from 'zustand'
import { Subscriber, SubscriberUIModel } from '@renderer/models/Subscriber'
import { getAllSubscribers } from '@renderer/services/subscriber'
import { RSSItem } from '@renderer/models/RSS'

interface SubscriberState {
  subscribers: Subscriber[]
  addSubscriber: (subscriber: SubscriberUIModel) => void
  loadSubscribers: () => void
  activeRSSItem: RSSItem | null
  setActiveRSSItem: (rssItem: RSSItem) => void
  resetActiveRSSItem: () => void
}

export const useSubscriberStore = create<SubscriberState>((set) => ({
  subscribers: [],
  activeRSSItem: null,
  addSubscriber: (subscriber: SubscriberUIModel): void => {
    window.RssAPI.addRSS(subscriber.name, subscriber.rssSource)
    // reload subscribers
    set(() => ({
      subscribers: getAllSubscribers()
    }))
  },
  loadSubscribers: (): void => {
    if (useSubscriberStore.getState().subscribers.length > 0) {
      return
    }
    set(() => ({
      subscribers: getAllSubscribers()
    }))
  },
  setActiveRSSItem: (rssItem: RSSItem): void => {
    set(() => ({
      activeRSSItem: rssItem
    }))
  },
  resetActiveRSSItem(): void {
    set(() => ({
      activeRSSItem: null
    }))
  }
}))
