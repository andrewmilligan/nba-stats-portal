import { useMemo } from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';

import getAssetUrl from 'Utils/paths/getAssetUrl';
import formatUTCDate from 'Utils/dates/formatUTCDate';
import useDataFetch from 'Utils/hooks/useDataFetch';
import gameSlug from 'Utils/routes/games/gameSlug';
import useHashProps from 'Utils/hooks/useHashProps';
import { useInitializeGame, useGame } from 'Atoms/game';
import { useDailySchedule } from 'Atoms/schedule';
import Head from 'Components/Head';
import Navigation from 'Components/Navigation';
import Footer from 'Components/Footer';
import Well from 'Components/Well';
import TopLine from 'Components/TopLine';
import Promo from 'Components/Promo';
import LeadTracker from 'Components/LeadTracker';
import PlayByPlay from 'Components/PlayByPlay';
import FloorLineup from 'Components/FloorLineup';
import ErrorBoundary from 'Components/ErrorBoundary';

export default function Game() {
  const {
    game: gameSlug = '',
  } = useHashProps();

  const [league, gameDate, gameId] = gameSlug.split('--');

  useInitializeGame(gameId, gameDate, league);
  const game = useGame(gameId);
  const schedule = useDailySchedule(gameDate, league);

  const {
    games = [],
  } = schedule || {};
  const gameMetadata = games.find((g) => g.gameId === gameId);

  const isLoaded = game && (
    game.isUpcoming || !!(game.boxScore && game.playByPlay)
  );

  return (
    <div>
      <Head />
      <Navigation withGames />
      <div style={{ minHeight: 500 }}>
        {isLoaded && (
          <Well>
            <ErrorBoundary>
              <TopLine
                game={game}
                gameMetadata={gameMetadata}
                isUpcoming={game.isUpcoming}
                league={league}
              />
            </ErrorBoundary>
            {game.isUpcoming ? (
              <Promo
                game={gameMetadata}
              />
            ) : (
              <>
                <ErrorBoundary>
                  <LeadTracker
                    game={game}
                    league={league}
                  />
                </ErrorBoundary>
                <ErrorBoundary>
                  <PlayByPlay
                    game={game}
                    playByPlay={game.playByPlay}
                    league={league}
                  />
                </ErrorBoundary>
                <ErrorBoundary>
                  <FloorLineup
                    game={game}
                    league={league}
                  />
                </ErrorBoundary>
              </>
            )}
          </Well>
        )}
      </div>
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
