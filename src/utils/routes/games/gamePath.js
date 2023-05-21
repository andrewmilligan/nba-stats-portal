import gameSlug from './gameSlug';

const gamePath = function gamePath({ league, gameDate, game }) {
  // return `/game/${gameDate}/${gameSlug(game)}/`;
  const slug = `${league}--${gameDate}--${game.gameId}`;
  return `/game/#game=${slug}`;
};

export default gamePath;
