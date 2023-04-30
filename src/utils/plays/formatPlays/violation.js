import { block, tokenize, player } from './tokens';

const getNodes = (play) => {
  const {
    personId,
    actionType,
    subType,
  } = play;

  return tokenize`${player(personId)} is called for a ${subType} violation`;
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
