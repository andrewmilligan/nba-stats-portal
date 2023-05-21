import { block, tokenize, player } from './tokens';
import choose from './choose';

const make = {
  dunk: [
    'makes a dunk',
    'slams home a dunk',
    'slams it home',
    'throws it down',
  ],
  '3pt': [
    'makes a three',
    'makes a three pointer',
    'knocks down a three',
    'knocks down a three pointer',
    'knocks one down from three',
    'knocks one down from deep',
    'sinks a three',
    'sinks a three pointer',
    'sinks one from three',
    'sinks one from deep',
  ],
  'jump shot': [
    'makes a jump shot',
    'makes a jumper',
    'makes a jumper',
    'knocks down a jump shot',
    'knocks down a jumper',
    'sinks a jump shot',
    'sinks a jumper',
  ],
};

const getShotType = (play) => {
  const {
    actionType,
    subType,
  } = play;

  if (actionType === '3pt') return actionType;

  const subLower = subType.toLowerCase();
  if (subLower === 'hook') return 'hook shot';
  return subLower;
};

const getNodes = (play) => {
  const {
    actionNumber: seed,
    teamId,
    shotResult,
    personId,
    actionType,
    subType,
  } = play;

  const shotType = getShotType(play);
  const missName = (actionType === '3pt')
    ? ['a three', 'a three pointer', 'from three', 'from deep']
    : [`a ${shotType}`];

  if (shotResult === 'Missed') {
    return tokenize`${player(personId, { teamId })} misses
      ${choose(missName, { seed })}`;
  }

  const actions = (actionType === '3pt')
    ? make[actionType]
    : (make[shotType] || [`makes a ${shotType}`]);
  return tokenize`${player(personId, { teamId })} ${choose(actions, { seed })}`;
};

const shot = function shot(play) {
  const {
    teamId,
    shotResult,
    personId,
    actionType,
  } = play;

  const result = (shotResult === 'Missed')
    ? 'disadvantage'
    : 'advantage';

  return block(play, {
    teamId,
    result,
    nodes: getNodes(play),
  });
};

export default shot;
