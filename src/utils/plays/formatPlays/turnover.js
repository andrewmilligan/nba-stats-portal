import { block, team, teamVerb, tokenize, player } from './tokens';

const getDescriptor = (play) => {
  const {
    subType,
    descriptor,
  } = play;

  if (descriptor === 'lost ball') {
    return 'loses the ball';
  }

  const descriptions = {
    traveling: 'travels',
    'bad pass': 'thows it away',
    'out-of-bounds': 'steps out of bounds',
    'lost ball': 'loses the ball',
  };
  return descriptions[subType];
};

const getNodes = (play) => {
  const {
    teamId,
    personId,
    actionType,
    subType,
  } = play;

  const teamToken = team(teamId);

  if (subType === 'shot clock') {
    const lets = teamVerb(teamToken.id, 'lets');
    const turns = teamVerb(teamToken.id, 'turns');
    return tokenize`${teamToken} ${lets} the shot clock expire
      and ${turns} it over`;
  }

  const description = getDescriptor(play);
  if (description) {
    return tokenize`${player(personId, { teamId })} ${description} and
      turns it over`;
  }

  return tokenize`${player(personId, { teamId })} turns it over`;
};

const turnover = function turnover(play) {
  const {
    teamId,
    subType,
  } = play;

  if (subType === 'offensive foul') return null;

  return block(play, {
    teamId,
    result: 'disadvantage',
    nodes: getNodes(play),
  });
};

export default turnover;
