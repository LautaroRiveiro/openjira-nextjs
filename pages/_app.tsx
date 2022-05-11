import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { darkTheme, lightTheme } from '../themes'
import { UIContextProvider } from '../context/ui'
import { EntriesContextProvider } from '../context/entries'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UIContextProvider>
      <SnackbarProvider maxSnack={3}>
        <EntriesContextProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </EntriesContextProvider>
      </SnackbarProvider>
    </UIContextProvider>
  )
}

export default MyApp
