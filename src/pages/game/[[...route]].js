import { useMemo } from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import fs from 'fs';

import getAssetUrl from 'Utils/paths/getAssetUrl';
import formatUTCDate from 'Utils/dates/formatUTCDate';
import useDataFetch from 'Utils/hooks/useDataFetch';
import { playerBoxScores } from 'Utils/data/urls';
import gameSlug from 'Utils/routes/games/gameSlug';
import { useInitializeGame, useGame } from 'Atoms/game';
import Head from 'Components/Head';
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
    gameDate,
    gameMetadata,
  } = props;

  const { gameId } = gameMetadata;

  useInitializeGame(gameId);
  const game = useGame(gameId);

  const {
    homeTeam,
    awayTeam,
  } = gameMetadata;
  const { data: homeTeamPlayerBoxScores, } = useDataFetch(
    playerBoxScores(homeTeam.teamId),
  );
  const { data: awayTeamPlayerBoxScores, } = useDataFetch(
    playerBoxScores(awayTeam.teamId),
  );

  const isLoaded = game && (
    game.isUpcoming || !!(game.boxScore && game.playByPlay)
  );

  const homeName = `${homeTeam.teamCity} ${homeTeam.teamName}`;
  const awayName = `${awayTeam.teamCity} ${awayTeam.teamName}`;
  const date = gameMetadata ? formatUTCDate(gameMetadata.gameDateTime, '{apday}') : '';
  const gameName = `${awayName} at ${homeName} on ${date}: Live Game Stats`;

  return (
    <div>
      <Head
        title={gameName}
      />
      <Navigation withGames />
      {isLoaded && (
        <Well>
          <TopLine
            game={game}
            gameMetadata={gameMetadata}
            isUpcoming={game.isUpcoming}
          />
          {game.isUpcoming ? (
            <Promo
              game={gameMetadata}
            />
          ) : (
            <>
              <LeadTracker
                game={game}
              />
              <PlayByPlay
                game={game}
                playByPlay={game.playByPlay}
              />
              <FloorLineup
                game={game}
                seasonBoxScores={{
                  homeTeam: homeTeamPlayerBoxScores,
                  awayTeam: awayTeamPlayerBoxScores,
                }}
              />
            </>
          )}
        </Well>
      )}
      <Footer />
    </div>
  )
}

export const getStaticProps = async function getStaticProps(props) {
  const { route = [] } = props.params;
  const [gameDate, slug] = route;

  const dates = JSON.parse(fs.readFileSync('__cache__/dates.json'));
  const schedule = JSON.parse(fs.readFileSync('__cache__/schedule.json'));

  const date = schedule.gameDates.find((d) => d.gameDate === gameDate);
  const game = date.games.find((g) => gameSlug(g) === slug);

  const getTeamMetadata = (team) => ({
    teamId: team.teamId,
    teamName: team.teamName,
    teamCity: team.teamCity,
    teamTricode: team.teamTricode,
  });

  const gameMetadata = {
    gameId: game.gameId,
    gameDateTime: game.gameDateTime,
    homeTeam: getTeamMetadata(game.homeTeam),
    awayTeam: getTeamMetadata(game.awayTeam),
  };

  return {
    props: {
      dates,
      gameDate,
      gameMetadata,
    },
  };
};

export const getStaticPaths = async function getStaticPaths() {
  fs.mkdirSync('__cache__', { recursive: true });

  const datesRsp = await fetch(getAssetUrl('/stats/global/dates.json'));
  const dates = await datesRsp.json();
  fs.writeFileSync('__cache__/dates.json', JSON.stringify(dates));

  const scheduleRsp = await fetch(getAssetUrl('/stats/global/schedule.json'));
  const schedule = await scheduleRsp.json();
  fs.writeFileSync('__cache__/schedule.json', JSON.stringify(schedule));

  const paths = schedule.gameDates
    .map(({ gameDate, games }) => games.map((game) => ({
      params: {
        route: [gameDate, gameSlug(game)],
      },
    })))
    .flat()
    .filter(({ params }) => !!params.route[1]);

  return {
    paths,
    fallback: false,
  };
};
