import type { AppProps } from 'next/app'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import '../styles/globals.css'
import { lightTheme } from '../themes'
import { UIContextProvider } from '../context/ui'
import { EntriesContextProvider } from '../context/entries'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UIContextProvider>
      <EntriesContextProvider>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </EntriesContextProvider>
    </UIContextProvider>
  )
}

export default MyApp
