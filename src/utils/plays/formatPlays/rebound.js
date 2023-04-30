import { block, tokenize, team, teamVerb, player } from './tokens';

const getNodes = (play) => {
  const {
    teamId,
    personId,
    qualifiers,
    subType,
  } = play;

  if (qualifiers.includes('team')) {
    const teamToken = team(teamId);
    const verb = teamVerb(teamToken.id, 'collects');
    return tokenize`${teamToken} ${verb} the
      ${subType} rebound`;
  }

  return tokenize`${player(personId)} collects the
    ${subType} rebound`;
};

const rebound = function rebound(play) {
  const {
    teamId,
    personId,
    actionType,
    subType,
  } = play;

  return block(play, {
    teamId,
    result: 'advantage',
    nodes: getNodes(play),
  });
};

export default rebound;
