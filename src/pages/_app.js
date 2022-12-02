import AtomsRoot from 'Atoms/index';

import 'Styles/globals.scss'

const App = function App({ Component, pageProps }) {
  return (
    <AtomsRoot pageProps={pageProps}>
      <Component {...pageProps} />
    </AtomsRoot>
  );
};

export default App;
