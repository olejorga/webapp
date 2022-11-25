// import '../styles/main.scss'
// import type { AppProps } from 'next/app'
// import Layout from '../components/Layout'

// function LunchApp({ Component, pageProps }: AppProps) {
//   return (
//     <Layout>
//       <Component {...pageProps} />
//     </Layout>
//   )
// }

// export default LunchApp

import '../styles/test.css'
import type { AppProps } from 'next/app'

function LunchApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default LunchApp
