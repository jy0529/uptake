import { RSSItem } from '@renderer/models/RSS'
import { readRSS } from '@renderer/services/rss'
import { getAllSubscribers } from '@renderer/services/subscriber'
import { useLoaderData } from 'react-router-dom'

export async function loader({ params }): Promise<{ rssItem: RSSItem }> {
  const { subscriberId, title } = params
  const subscribers = getAllSubscribers()
  const subscriber = subscribers.find((item) => item.id == parseInt(subscriberId))
  if (!subscriber) {
    throw new Error('Subscriber not found')
  }
  const rssResponse = await readRSS(subscriber.rssSource)
  const item = rssResponse.items.find((item) => item.title == title)
  if (!item) {
    throw new Error('Item not found')
  }
  return {
    rssItem: item
  }
}

export function DetailPage(): JSX.Element {
  const { rssItem } = useLoaderData() as { rssItem: RSSItem }

  return (
    <section
      className="detail-page"
      dangerouslySetInnerHTML={{ __html: rssItem.content }}
    ></section>
  )
}
