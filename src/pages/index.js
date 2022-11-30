import fetch from 'isomorphic-unfetch';

import getAssetUrl from 'Utils/paths/getAssetUrl';
import Head from 'Components/Head';
import Navigation from 'Components/Navigation';
import Footer from 'Components/Footer';
import Well from 'Components/Well';
import GameSummariesIndex from 'Components/GameSummariesIndex';

export default function Home(props) {
  const {
    dates,
  } = props;

  return (
    <div>
      <Head />
      <Navigation />
      <Well>
        <GameSummariesIndex
          dates={dates}
        />
      </Well>
      <Footer />
    </div>
  )
}

export const getStaticProps = async function getStaticProps() {
  const rsp = await fetch(getAssetUrl('/stats/global/dates.json'));
  const dates = await rsp.json();
  return {
    props: {
      dates,
    },
  };
};
