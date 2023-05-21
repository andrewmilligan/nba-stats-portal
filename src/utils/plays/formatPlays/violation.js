import { block, tokenize, player, team, teamVerb } from './tokens';

const getNodes = (play) => {
  const {
    personId,
    teamId,
    actionType,
    subType,
  } = play;

  if (personId !== 0) {
    return tokenize`${player(personId, { teamId })} is called for a ${subType} violation`;
  }

  const teamToken = team(teamId);
  const verb = teamVerb(teamToken.id, {
    plural: 'are',
    singular: 'is',
  });
  return tokenize`${teamToken} ${verb} called for a ${subType} violation`;
};

const violation = function violation(play) {
  const {
    teamId,
    subType,
  } = play;

  return block(play, {
    teamId,
    result: 'disadvantage',
    nodes: getNodes(play),
  });
};

export default violation;
