import format from 'Utils/dates/format';

import { UPCOMING, ONGOING, COMPLETE } from './statuses';
import statusCodeToSlug from './statusCodeToSlug';

const gameStatusText = function gameStatusText(game) {
  const {
    gameStatus,
    gameStatusText: defaultText,
    gameDateTime,
  } = game;

  const status = statusCodeToSlug(gameStatus);
  const time = format(gameDateTime, '{aptime} {timezone}');
  const text = {
    [UPCOMING]: time,
    [ONGOING]: defaultText,
    [COMPLETE]: 'FINAL',
  };
  return text[status];
};

export default gameStatusText;
