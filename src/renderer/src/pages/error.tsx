import { ErrorResponse, useRouteError } from 'react-router-dom'

export default function ErrorPage(): JSX.Element {
  const error = useRouteError() as ErrorResponse & { message: string }
  return (
    <div id="error-page">
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}
