import '@/styles/globals.css'
import AppContextProvider from '../src/context/AppContext'

export default function App({ Component, pageProps }) {
  return (
    <div>
      <AppContextProvider>
        <Component {...pageProps} />)
      </AppContextProvider>
    </div>
  )
}
