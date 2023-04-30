import { block, tokenize, period as periodToken } from './tokens';

const period = function period(play) {
  const {
    period: periodNumber,
    subType,
  } = play;

  const name = periodToken(periodNumber);
  const nodes = (subType === 'start')
    ? tokenize`${name} is underway`
    : tokenize`that's the end of ${name}`;

  return block(play, {
    isolated: true,
    nodes,
  });
};

export default period;
