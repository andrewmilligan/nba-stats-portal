import teamMetadata from 'Utils/teams/metadata';

const gameSlug = function gameSlug(game, league = 'nba') {
  const {
    homeTeam: {
      teamId: homeId,
    },
    awayTeam: {
      teamId: awayId,
    },
  } = game;

  const awayMeta = teamMetadata[league].get(awayId);
  const homeMeta = teamMetadata[league].get(homeId);

  if (!awayMeta || !homeMeta) return undefined;

  const awaySlug = awayMeta.teamSlug;
  const homeSlug = homeMeta.teamSlug;
  return `${awaySlug}-${homeSlug}`;
};

export default gameSlug;
