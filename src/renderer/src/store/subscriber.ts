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
    // get last id
    const lastId = useSubscriberStore.getState().subscribers.reduce((maxId, subscriber) => {
      if (subscriber.id > maxId) {
        return subscriber.id
      }
      return maxId
    }, 0)

    const newSubscriber: Subscriber = {
      id: lastId + 1,
      name: subscriber.name,
      rssSource: subscriber.rssSource
    }

    set((state) => ({
      subscribers: [...state.subscribers, newSubscriber]
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
