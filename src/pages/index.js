import fetch from 'isomorphic-unfetch';

import getAssetUrl from 'Utils/paths/getAssetUrl';
import Head from 'Components/Head';
import Navigation from 'Components/Navigation';
import Footer from 'Components/Footer';
import Well from 'Components/Well';
import GameSummariesIndex from 'Components/GameSummariesIndex';
import ErrorBoundary from 'Components/ErrorBoundary';

export default function Home() {
  return (
    <div>
      <Head />
      <Navigation />
      <Well>
        <ErrorBoundary>
          <GameSummariesIndex league='nba' />
        </ErrorBoundary>
        <ErrorBoundary>
          <GameSummariesIndex league='wnba' />
        </ErrorBoundary>
      </Well>
      <Footer />
    </div>
  )
}

export const getStaticProps = async function getStaticProps() {
  const nbaRsp = await fetch(getAssetUrl('/stats/nba/global/dates.json'));
  const nbaDates = await nbaRsp.json();

  const wnbaRsp = await fetch(getAssetUrl('/stats/wnba/global/dates.json'));
  const wnbaDates = await wnbaRsp.json();

  return {
    props: {
      nbaDates,
      wnbaDates,
    },
  };
};
