import { RouteObject, createHashRouter } from 'react-router-dom'
import { ListPage, loader as rssListLoader } from './pages/list'
import ErrorPage from './pages/error'
import { MainPage } from './pages/main'

export const routeConfig: RouteObject[] = [
  {
    path: '/',
    Component: MainPage,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/list/:subscriberId',
        Component: ListPage,
        loader: rssListLoader
      }
    ]
  }
]

export const createRouter = (): ReturnType<typeof createHashRouter> => {
  return createHashRouter(routeConfig)
}
