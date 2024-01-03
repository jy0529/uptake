import { create } from 'zustand'
import { Subscriber } from '@renderer/models/Subscriber'
import { getAllSubscribers } from '@renderer/services/subscriber'

interface SubscriberState {
  subscribers: Subscriber[]
  addSubscriber: (subscriber: Subscriber) => void
  loadSubscribers: () => void
}

export const useSubscriberStore = create<SubscriberState>((set) => ({
  subscribers: [],
  addSubscriber: (subscriber: Subscriber): void => {
    set((state) => ({
      subscribers: [...state.subscribers, subscriber]
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
