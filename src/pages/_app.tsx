import { ReactElement } from 'react'

interface AppProps {
  Component: React.ComponentType<any>
  pageProps: any
}

export default function App({ Component, pageProps }: AppProps): ReactElement {
  return <Component {...pageProps} />
}