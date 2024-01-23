import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemContent from '@mui/joy/ListItemContent'
import Typography from '@mui/joy/Typography'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import Box from '@mui/joy/Box'

import { RSSItem } from '@renderer/models/RSS'
import { readRSS } from '@renderer/services/rss'
import { useLoaderData } from 'react-router-dom'
import { useSubscriberStore } from '@renderer/store/subscriber'
import { useEffect, useState } from 'react'

import { RssDetail } from '@renderer/components/detail'

interface ListPageParams {
  subscriberId: string
}
export async function loader({ params }): Promise<ListPageParams> {
  return {
    subscriberId: params.subscriberId
  }
}

export function ListPage(): JSX.Element {
  const { subscriberId } = useLoaderData() as ListPageParams
  const loadSubscribers = useSubscriberStore((state) => state.loadSubscribers)
  loadSubscribers()
  const subscribers = useSubscriberStore((state) => state.subscribers)
  const subscriber = subscribers.find((item) => item.id == parseInt(subscriberId))
  if (!subscriber) {
    throw new Error('Subscriber not found')
  }

  const [items, setItems] = useState<RSSItem[]>([])

  const setActiveRSSItem = useSubscriberStore((state) => state.setActiveRSSItem)

  useEffect(() => {
    const fetchRSS = async (): Promise<void> => {
      const rssResponse = await readRSS(subscriber.rssSource)
      setItems(rssResponse.items)
    }
    fetchRSS()
  }, [])

  return (
    <Box className="flex items-stretch max-w-full overflow-hidden">
      <List className="max-w-80 overflow-y-auto max-h-screen">
        {items.map((item) => (
          <ListItem key={item.guid}>
            <ListItemContent>
              <Card
                variant="soft"
                className="w-full cursor-pointer"
                onClick={() => setActiveRSSItem(item)}
              >
                <CardContent className="w-full">
                  <Typography className="w-full" level="title-md">
                    {item.title}
                  </Typography>
                  <Typography className="w-full" level="body-sm" noWrap={true}>
                    {item.contentSnippet}
                  </Typography>
                </CardContent>
              </Card>
            </ListItemContent>
          </ListItem>
        ))}
      </List>
      <Box className="overflow-y-auto max-h-screen">
        <RssDetail className="flex-1"></RssDetail>
      </Box>
    </Box>
  )
}
