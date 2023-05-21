import { ordinal, apnumber } from 'journalize';
import { block, tokenize, player } from './tokens';

const getVerb = (play) => {
  const {
    shotResult,
  } = play;

  return (shotResult === 'Made') ? 'makes' : 'misses';
};

const getShot = (play) => {
  const {
    subType,
  } = play;
  const [shot, shots] = subType.split(' of ');
  return {
    shot: parseInt(shot, 10),
    shots: parseInt(shots, 10),
  };
};

const allSameOutcome = (plays) => {
  return plays.every((p, i, ps) => p.shotResult === ps[0].shotResult);
};

const getNodes = (play) => {
  const {
    personId,
    teamId,
    subType,
    shotResult,
  } = play;

  const { shot, shots } = getShot(play);
  const isLast = shot === shots;

  if (shots === 1) {
    return tokenize`${player(personId, { teamId })} ${getVerb(play)} the freethrow`;
  }

  const {
    previousFreethrows = [],
  } = play;
  if (isLast && allSameOutcome([play, ...previousFreethrows])) {
    const num = shots === 2 ? 'both' : `all ${apnumber(shots)}`;
    return tokenize`${player(personId, { teamId })} ${getVerb(play)} ${num} freethrows`;
  }

  const playToOutcome = (p) => (
    `${getVerb(p)} the ${ordinal(getShot(p).shot, true)}`
  );
  const outcomes = [
    ...previousFreethrows.map(playToOutcome),
    playToOutcome(play),
  ];
  outcomes[0] = `${outcomes[0]} of ${apnumber(shots)} freethrows`;
  const outcomeStrings = [
    outcomes.slice(0, outcomes.length - 2).join(', '),
    outcomes.slice(outcomes.length - 2).join(' and '),
  ].join(' ');

  return tokenize`${player(personId, { teamId })} ${outcomeStrings}`;
};

const freethrow = function freethrow(play) {
  const {
    teamId,
    personId,
    subType,
    shotResult,
  } = play;

  const isMade = shotResult === 'Made';

  return block(play, {
    isolated: true,
    teamId,
    result: isMade ? 'advantage' : 'disadvantage',
    nodes: getNodes(play),
  });
};

export default freethrow;
