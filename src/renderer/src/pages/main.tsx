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
      <Grid container spacing={1} sx={{ flexGrow: 1 }}>
        <Grid xs={2}>
          <aside
            style={{
              position: 'fixed',
              left: 0,
              width: '100%',
              maxWidth: 180,
              height: '100%',
              borderRight: '1px solid #ededed'
            }}
          >
            <SubscriberList changeSubscriber={changeSubscriber} />
          </aside>
        </Grid>
        <Grid xs={10}>
          <main className="w-full">
            <Outlet />
          </main>
        </Grid>
      </Grid>
    </Stack>
  )
}
