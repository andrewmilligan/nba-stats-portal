import Head from 'next/head'
import fetch from 'isomorphic-unfetch';

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
      <Head>
        <title>NBA Stats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
  const rsp = await fetch('https://d19kaplwqv19rl.cloudfront.net/stats/global/dates.json');
  const dates = await rsp.json();
  return {
    props: {
      dates,
    },
  };
};
