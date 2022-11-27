import AuthContextProvider from '../components/AuthContext'
import Layout from '../components/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  
  return (
  <>
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  </>
  ) 
}

export default MyApp
