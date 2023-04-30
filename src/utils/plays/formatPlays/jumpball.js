import { block, tokenize, player } from './tokens';

const jumpball = function jumpball(play) {
  const {
    teamId,
    jumpBallWonPersonId,
    jumpBallLostPersonId,
    jumpBallRecoverdPersonId: jumpBallRecoveredPersonId,
  } = play;

  const nodes = tokenize`${player(jumpBallWonPersonId)} wins the
    jump ball over ${player(jumpBallLostPersonId)}, tipping it
    to ${player(jumpBallRecoveredPersonId)}`;

  return block(play, {
    isolated: true,
    teamId,
    result: 'advantage',
    nodes,
  });
};

export default jumpball;
