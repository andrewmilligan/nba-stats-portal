import Head from 'next/head'

import useHashProps from 'Utils/hooks/useHashProps';
import useDataFetch from 'Utils/hooks/useDataFetch';
import { gameBoxScore } from 'Utils/data/urls';
import FloorLineup from 'Components/FloorLineup';

export default function Game() {
  const {
    game,
  } = useHashProps();

  const { data: boxScore } = useDataFetch(
    gameBoxScore(game),
    { interval: 10000 },
  );

  return (
    <div>
      <Head>
        <title>NBA Stats: Game Stats</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FloorLineup boxScore={boxScore} />
    </div>
  )
}

export const getStaticProps = async function getStaticProps() {
  return {
    props: {},
  };
};
