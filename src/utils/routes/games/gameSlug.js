import teamMetadata from 'Utils/teams/metadata';

const gameSlug = function gameSlug(game) {
  const {
    homeTeam: {
      teamId: homeId,
    },
    awayTeam: {
      teamId: awayId,
    },
  } = game;

  const awayMeta = teamMetadata.get(awayId);
  const homeMeta = teamMetadata.get(homeId);

  if (!awayMeta || !homeMeta) return undefined;

  const awaySlug = awayMeta.teamSlug;
  const homeSlug = homeMeta.teamSlug;
  return `${awaySlug}-${homeSlug}`;
};

export default gameSlug;
