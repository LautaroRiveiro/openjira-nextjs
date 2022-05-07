import type { AppProps } from 'next/app'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { darkTheme, lightTheme } from '../themes'
import { UIContextProvider } from '../context/ui'
import { EntriesContextProvider } from '../context/entries'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UIContextProvider>
      <EntriesContextProvider>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </EntriesContextProvider>
    </UIContextProvider>
  )
}

export default MyApp
