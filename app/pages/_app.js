import Head from 'next/head'
import { AuthProvider } from '../Auth'
import Layout from '../components/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>WhatsApp Web - by @joaolessab</title>
        <meta name="description" content="Created by @joaolessab" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  )
}

export default MyApp