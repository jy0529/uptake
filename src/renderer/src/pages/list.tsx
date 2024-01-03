import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemContent from '@mui/joy/ListItemContent'
import Typography from '@mui/joy/Typography'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'

import { RSSItem } from '@renderer/models/RSS'
import { readRSS } from '@renderer/services/rss'
import { Link as RouterLink, useLoaderData } from 'react-router-dom'
import Link from '@mui/joy/Link'
import { useSubscriberStore } from '@renderer/store/subscriber'
import { useEffect, useState } from 'react'

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
  const subscribers = useSubscriberStore((state) => state.subscribers)
  const subscriber = subscribers.find((item) => item.id == parseInt(subscriberId))
  if (!subscriber) {
    throw new Error('Subscriber not found')
  }

  const [items, setItems] = useState<RSSItem[]>([])

  useEffect(() => {
    const fetchRSS = async (): Promise<void> => {
      const rssResponse = await readRSS(subscriber.rssSource)
      setItems(rssResponse.items)
    }
    fetchRSS()
  }, [])

  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.guid}>
          <ListItemContent>
            <Link component={RouterLink} to={`/detail/${subscriberId}/${item.title}`}>
              <Card variant="soft">
                <CardContent>
                  <Typography level="title-md">{item.title}</Typography>
                  <Typography level="body-sm" noWrap>
                    {item.contentSnippet}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </ListItemContent>
        </ListItem>
      ))}
    </List>
  )
}
