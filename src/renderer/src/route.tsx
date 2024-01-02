import { RouteObject, createBrowserRouter } from 'react-router-dom'
import { ListPage, loader as rssListLoader } from './pages/list'
import ErrorPage from './pages/error'
import { MainPage } from './pages/main'
import { DetailPage, loader as detailPageLoader } from './pages/detail'

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
      },
      {
        path: '/detail/:subscriberId/:title',
        Component: DetailPage,
        loader: detailPageLoader
      }
    ]
  }
]

export const createRouter = (): ReturnType<typeof createBrowserRouter> => {
  return createBrowserRouter(routeConfig)
}
