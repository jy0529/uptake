import { useState } from 'react'
import { readRSS } from './services/rss'
import { SubscriberList } from './components/SubscriberList'
import '@fontsource/inter'
import Stack from '@mui/joy/Stack'
import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemContent from '@mui/joy/ListItemContent'
import Typography from '@mui/joy/Typography'
import Grid from '@mui/joy/Grid'
import { Subscriber } from './models/Subscriber'
import { RSSItem } from './models/RSS'

function RSSApp(): JSX.Element {
  const [items, setItems] = useState<RSSItem[]>([])

  const changeSubscriber = async (subscriber: Subscriber): Promise<void> => {
    const data = await readRSS(subscriber.rssSource)
    setItems(data.items.filter((item) => item.guid != undefined && item.title != ''))
  }

  return (
    <Stack
      spacing={2}
      sx={{
        bgcolor: '#FBFCFE'
      }}
    >
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={3}>
          <aside
            style={{
              position: 'fixed',
              left: 0,
              width: '100%',
              maxWidth: 200
            }}
          >
            <SubscriberList changeSubscriber={changeSubscriber} />
          </aside>
        </Grid>
        <Grid xs={9}>
          <main>
            <List>
              {items.map((item) => (
                <ListItem key={item.guid}>
                  <ListItemContent>
                    <Typography>{item.title}</Typography>
                    <Typography level="body-sm" noWrap>
                      {item.contentSnippet}
                    </Typography>
                  </ListItemContent>
                </ListItem>
              ))}
            </List>
          </main>
        </Grid>
      </Grid>
    </Stack>
  )
}

export { RSSApp }
