import type { AppProps } from 'next/app'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import '../styles/globals.css'
import { lightTheme } from '../themes'
import { UIContextProvider } from '../context/ui'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UIContextProvider>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </UIContextProvider>
  )
}

export default MyApp
