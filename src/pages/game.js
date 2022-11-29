import { useMemo } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';

import useHashProps from 'Utils/hooks/useHashProps';
import useDataFetch from 'Utils/hooks/useDataFetch';
import {
  dailySchedule,
  gameBoxScore,
  gamePlayByPlay,
} from 'Utils/data/urls';
import { UPCOMING_CODE } from 'Utils/gameStatus/statuses';
import Navigation from 'Components/Navigation';
import Footer from 'Components/Footer';
import Well from 'Components/Well';
import TopLine from 'Components/TopLine';
import Promo from 'Components/Promo';
import LeadTracker from 'Components/LeadTracker';
import PlayByPlay from 'Components/PlayByPlay';
import FloorLineup from 'Components/FloorLineup';

export default function Game(props) {
  const {
    dates,
  } = props;

  const router = useRouter();
  const {
    game = '',
  } = useHashProps({ path: router.asPath });
  const [gameDate, gameId] = game.split('--');

  const { data: schedule } = useDataFetch(dailySchedule(gameDate));

  const { data: boxScore } = useDataFetch(
    gameBoxScore(gameId),
    { interval: 10000 },
  );

  const { data: playByPlay } = useDataFetch(
    gamePlayByPlay(gameId),
    { interval: 10000 },
  );

  const gameInSchedule = useMemo(() => {
    if (!schedule) return undefined;
    return schedule.games.find((game) => game.gameId === gameId);
  }, [schedule, gameId]);

  const isUpcoming = (
    !gameInSchedule
    || gameInSchedule.gameStatus === UPCOMING_CODE
  );

  return (
    <div>
      <Head>
        <title>NBA Stats: Game Stats</title>
        <link rel="icon" href="/nba/favicon.ico" />
      </Head>
      <Navigation
        dates={dates}
        withGames
      />
      <Well>
        <TopLine
          boxScore={boxScore}
          gameInSchedule={gameInSchedule}
          isUpcoming={isUpcoming}
        />
        {isUpcoming ? (
          <Promo
            game={gameInSchedule}
          />
        ) : (
          <>
            <LeadTracker
              boxScore={boxScore}
              playByPlay={playByPlay}
            />
            {/* <PlayByPlay playByPlay={playByPlay} /> */}
            <FloorLineup boxScore={boxScore} />
          </>
        )}
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
