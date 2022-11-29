const parseGameSlug = function parseGameSlug(slug) {
  const [
    awayTeamSlug,
    homeTeamSlug,
  ] = slug.split('-');
  return {
    awayTeamSlug,
    homeTeamSlug,
  };
};

export default parseGameSlug;
