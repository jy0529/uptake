import List from '@mui/joy/List'
import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'
import Box from '@mui/joy/Box'
import IconButton from '@mui/joy/IconButton'
import Add from '@mui/icons-material/Add'
import { Subscriber } from '@renderer/models/Subscriber'
import React, { useEffect, useState } from 'react'
import { useSubscriberStore } from '@renderer/store/subscriber'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Button from '@mui/joy/Button'

interface Props {
  changeSubscriber: (subscriber: Subscriber) => void
}

export function SubscriberList({ changeSubscriber }: Props): JSX.Element {
  const [selectedSubscriber, setSelectedSubscriber] = useState<string>('')

  const loadSubscribers = useSubscriberStore((state) => state.loadSubscribers)
  const data = useSubscriberStore((state) => state.subscribers)

  const [open, setOpen] = useState(false)

  useEffect(() => {
    loadSubscribers()
  }, [])

  const clickHandler = (subscriber: Subscriber): void => {
    changeSubscriber(subscriber)
    setSelectedSubscriber(subscriber.rssSource)
  }

  const addSubscriberAction = useSubscriberStore((state) => state.addSubscriber)
  const [subscriber, setSubscriber] = useState<{
    name: string
    rssSource: string
  }>({
    name: '',
    rssSource: ''
  })

  const addSubscriberHandler = (): void => {
    setOpen(true)
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    addSubscriberAction(subscriber)
    setOpen(false)

    // reset form
    setSubscriber({
      name: '',
      rssSource: ''
    })
  }

  return (
    <Box>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        <ModalDialog className="w-96 h-auto">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel
                required={true}
                sx={{
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}
              >
                name:
              </FormLabel>
              <Input
                required
                value={subscriber.name}
                onChange={(e) => setSubscriber({ ...subscriber, name: e.target.value })}
              />
            </FormControl>
            <Box className="mt-4">
              <FormControl>
                <FormLabel
                  required={true}
                  sx={{
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  rss:
                </FormLabel>
                <Input
                  required
                  value={subscriber.rssSource}
                  onChange={(e) => setSubscriber({ ...subscriber, rssSource: e.target.value })}
                />
              </FormControl>
            </Box>
            <Box className="mt-4">
              <Button type="submit" variant="solid">
                Submit
              </Button>
            </Box>
          </form>
        </ModalDialog>
      </Modal>
      <h2>订阅者</h2>
      <List
        sx={{
          maxWidth: 320
        }}
      >
        <ListItem
          startAction={
            <IconButton size="sm" variant="plain" color="neutral">
              <Add />
            </IconButton>
          }
        >
          <ListItemButton
            {...{ selected: selectedSubscriber === '' }}
            onClick={() => addSubscriberHandler()}
          >
            添加订阅者
          </ListItemButton>
        </ListItem>
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
