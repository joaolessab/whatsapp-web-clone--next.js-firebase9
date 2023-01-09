import Layout from '../components/Layout'
import Login from './login'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Login />
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
