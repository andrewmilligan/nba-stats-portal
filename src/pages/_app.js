import Script from 'next/script';
import AtomsRoot from 'Atoms/index';

import 'Styles/globals.scss'

const App = function App({ Component, pageProps }) {
  return (
    <>
      <AtomsRoot pageProps={pageProps}>
        <Component {...pageProps} />
      </AtomsRoot>

      {/* Cloudflare Web Analytics */}
      <Script
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "483cd5cbee314deb9183b549103b21a0"}'
      />
    </>
  );
};

export default App;
