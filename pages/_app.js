import '@/styles/globals.css'

import { NavBar } from '@/Components'
import { PublicFundingProvider } from '../Context/PublicFunding';

export default function App({ Component, pageProps }) {
  return (
    <>
      <PublicFundingProvider>
        <NavBar />
        <Component {...pageProps} />
        {/* <Footer /> */}
      </PublicFundingProvider>
    </>
  );
}
