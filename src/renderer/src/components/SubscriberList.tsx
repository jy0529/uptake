import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'
import Box from '@mui/joy/Box'
import { Subscriber } from '@renderer/models/Subscriber'
import { useEffect, useState } from 'react'
import { useSubscriberStore } from '@renderer/store/subscriber'

interface Props {
  changeSubscriber: (subscriber: Subscriber) => void
}

export function SubscriberList({ changeSubscriber }: Props): JSX.Element {
  const [selectedSubscriber, setSelectedSubscriber] = useState<string>('')

  const loadSubscribers = useSubscriberStore((state) => state.loadSubscribers)
  const data = useSubscriberStore((state) => state.subscribers)

  useEffect(() => {
    loadSubscribers()
  }, [])

  const clickHandler = (subscriber: Subscriber): void => {
    changeSubscriber(subscriber)
    setSelectedSubscriber(subscriber.rssSource)
  }

  return (
    <Box>
      <h2>订阅者</h2>
      <List
        sx={{
          maxWidth: 320
        }}
      >
        {data.map((item) => (
          <ListItem key={item.rssSource}>
            <ListItemButton
              {...{ selected: item.rssSource === selectedSubscriber }}
              onClick={() => clickHandler(item)}
            >
              {item.name}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
