import gameSlug from './gameSlug';

const gamePath = function gamePath({ gameDate, game }) {
  return `/game/${gameDate}/${gameSlug(game)}/`;
};

export default gamePath;
