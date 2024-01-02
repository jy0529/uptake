import { RouterProvider } from 'react-router-dom'
import { createRouter } from './route'
import './assets/rss.css'
import '@fontsource/inter'

const router = createRouter()

function RSSApp(): JSX.Element {
  return <RouterProvider router={router} />
}

export { RSSApp }
