import { useEffect } from 'react'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light'
    document.documentElement.classList.add(theme)
  }, [])

  return <Component {...pageProps} />
}

export default MyApp