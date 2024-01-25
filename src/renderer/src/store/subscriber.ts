import { create } from 'zustand'
import { SubscriberUIModel } from '@renderer/models/Subscriber'
import { getAllSubscribers } from '@renderer/services/subscriber'
import { RSSItem } from '@renderer/models/RSS'
import { Rss } from '@prisma/client'

interface SubscriberState {
  subscribers: Rss[]
  addSubscriber: (subscriber: SubscriberUIModel) => void
  loadSubscribers: () => void
  activeRSSItem: RSSItem | null
  setActiveRSSItem: (rssItem: RSSItem) => void
  resetActiveRSSItem: () => void
}

export const useSubscriberStore = create<SubscriberState>((set) => ({
  subscribers: [],
  activeRSSItem: null,
  addSubscriber: async (subscriber: SubscriberUIModel): Promise<void> => {
    await window.RssAPI.addRSS(subscriber.name, subscriber.rssSource)
    // reload subscribers
    const subscribers = await getAllSubscribers()
    set(() => ({
      subscribers
    }))
  },
  loadSubscribers: async (): Promise<void> => {
    if (useSubscriberStore.getState().subscribers.length > 0) {
      return
    }
    const subscribers = await getAllSubscribers()
    set(() => ({
      subscribers
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
