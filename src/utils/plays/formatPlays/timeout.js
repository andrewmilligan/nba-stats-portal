import { block, tokenize, team, teamVerb } from './tokens';

const violation = function violation(play) {
  const {
    teamId,
    subType,
  } = play;

  const teamToken = team(teamId);
  const verb = teamVerb(teamToken.id, 'calls');
  const nodes = tokenize`${teamToken} ${verb} a timeout`;

  return block(play, {
    teamId,
    result: 'neutral',
    isolated: true,
    nodes,
  });
};

export default violation;
