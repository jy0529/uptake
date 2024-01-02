import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemContent from '@mui/joy/ListItemContent'
import Typography from '@mui/joy/Typography'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'

import { RSSResponse } from '@renderer/models/RSS'
import { readRSS } from '@renderer/services/rss'
import { getAllSubscribers } from '@renderer/services/subscriber'
import { Link as RouterLink , useLoaderData } from 'react-router-dom'
import Link from '@mui/joy/Link'

interface ListPageParams {
  rssResponse: RSSResponse
  subscriberId: number
}
export async function loader({ params }): Promise<ListPageParams> {
  const subscribers = getAllSubscribers()
  const subscriber = subscribers.find((item) => item.id == parseInt(params.subscriberId))
  if (!subscriber) {
    throw new Error('Subscriber not found')
  }
  const rssResponse = await readRSS(subscriber.rssSource)
  return {
    subscriberId: params.subscriberId,
    rssResponse: {
      ...rssResponse,
      items: rssResponse.items.filter((item) => item.guid != undefined && item.title != '')
    }
  }
}

export function ListPage(): JSX.Element {
  const { rssResponse, subscriberId } = useLoaderData() as ListPageParams

  return (
    <List>
      {rssResponse.items.map((item) => (
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
