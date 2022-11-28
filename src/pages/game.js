import Head from 'next/head'
import fetch from 'isomorphic-unfetch';

import useHashProps from 'Utils/hooks/useHashProps';
import useDataFetch from 'Utils/hooks/useDataFetch';
import { gameBoxScore, gamePlayByPlay } from 'Utils/data/urls';
import Navigation from 'Components/Navigation';
import Footer from 'Components/Footer';
import Well from 'Components/Well';
import TopLine from 'Components/TopLine';
import LeadTracker from 'Components/LeadTracker';
import PlayByPlay from 'Components/PlayByPlay';
import FloorLineup from 'Components/FloorLineup';

export default function Game(props) {
  const {
    dates,
  } = props;

  const {
    game,
  } = useHashProps();

  const { data: boxScore } = useDataFetch(
    gameBoxScore(game),
    { interval: 10000 },
  );

  const { data: playByPlay } = useDataFetch(
    gamePlayByPlay(game),
    { interval: 10000 },
  );

  return (
    <div>
      <Head>
        <title>NBA Stats: Game Stats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation
        dates={dates}
        withGames
      />
      <Well>
        <TopLine boxScore={boxScore} />
        <LeadTracker
          boxScore={boxScore}
          playByPlay={playByPlay}
        />
        <PlayByPlay playByPlay={playByPlay} />
        <FloorLineup boxScore={boxScore} />
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
