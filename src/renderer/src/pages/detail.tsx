import { RSSItem } from '@renderer/models/RSS'
import { readRSS } from '@renderer/services/rss'
import { useLoaderData } from 'react-router-dom'
import { useSubscriberStore } from '@renderer/store/subscriber'
import { useEffect, useState } from 'react'

interface DetailPageParams {
  subscriberId: string
  title: string
}

export async function loader({ params }): Promise<DetailPageParams> {
  const { subscriberId, title } = params

  return {
    subscriberId,
    title
  }
}

export function DetailPage(): JSX.Element {
  const { subscriberId, title } = useLoaderData() as DetailPageParams
  const subscribers = useSubscriberStore((state) => state.subscribers)
  const subscriber = subscribers.find((item) => item.id === parseInt(subscriberId))
  if (!subscriber) {
    throw new Error('Subscriber not found')
  }

  const [item, setItem] = useState<RSSItem | undefined>()

  useEffect(() => {
    const fetchRSS = async (): Promise<void> => {
      const rssResponse = await readRSS(subscriber.rssSource)
      const item = rssResponse.items.find((item) => item.title == title)
      setItem(item)
    }
    fetchRSS()
  }, [])

  return (
    <section
      className="detail-page"
      dangerouslySetInnerHTML={{ __html: item?.content ?? '' }}
    ></section>
  )
}
