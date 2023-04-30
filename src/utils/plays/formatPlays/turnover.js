import { block, team, teamVerb, tokenize, player } from './tokens';

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

  const descriptions = {
    traveling: 'travels',
    'bad pass': 'thows it away',
    'out-of-bounds': 'steps out of bounds',
    'lost ball': 'loses the ball',
  };
  if (descriptions[subType]) {
    return tokenize`${player(personId)} ${descriptions[subType]} and
      turns it over`;
  }

  return tokenize`${player(personId)} turns it over`;
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
