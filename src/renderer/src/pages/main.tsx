import Stack from '@mui/joy/Stack'
import Grid from '@mui/joy/Grid'
import { Subscriber } from '../models/Subscriber'
import { SubscriberList } from '../components/SubscriberList'
import { Outlet, useNavigate } from 'react-router-dom'

export function MainPage(): JSX.Element {
  const navigate = useNavigate()

  const changeSubscriber = async (subscriber: Subscriber): Promise<void> => {
    navigate(`/list/${subscriber.id}`)
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
          <main className="w-full">
            <Outlet />
          </main>
        </Grid>
      </Grid>
    </Stack>
  )
}
