import { create } from 'zustand'
import { Subscriber, SubscriberUIModel } from '@renderer/models/Subscriber'
import { getAllSubscribers } from '@renderer/services/subscriber'

interface SubscriberState {
  subscribers: Subscriber[]
  addSubscriber: (subscriber: SubscriberUIModel) => void
  loadSubscribers: () => void
}

export const useSubscriberStore = create<SubscriberState>((set) => ({
  subscribers: [],
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
  }
}))
