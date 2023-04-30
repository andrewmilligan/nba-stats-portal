import { block, text } from './tokens';
import period from './period';
import jumpball from './jumpball';
import shot from './shot';
import rebound from './rebound';
import turnover from './turnover';
import violation from './violation';
import freethrow from './freethrow';
import foul from './foul';
import timeout from './timeout';

const formatters = {
  period,
  jumpball,
  '3pt': shot,
  '2pt': shot,
  rebound,
  turnover,
  violation,
  freethrow,
  foul,
  timeout,
};

const formatPlay = function formatPlay(play) {
  const {
    actionType,
    description,
  } = play;

  const formatter = formatters[actionType];
  if (!formatter) {
    return block(play, {
      nodes: [text(play.description)],
    });
  }
  return formatter(play);
};

export default formatPlay;
