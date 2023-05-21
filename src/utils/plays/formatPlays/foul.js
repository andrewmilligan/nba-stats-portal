import { apnumber } from 'journalize';
import { block, tokenize, player, text } from './tokens';

const getNodes = (play) => {
  const {
    teamId,
    personId,
    foulDrawnPersonId,
    subType,
    descriptor,
    qualifiers,
  } = play;

  if (subType === 'technical') {
    return tokenize`${player(personId, { teamId })} commits a technical foul`;
  }

  if (subType === 'offensive') {
    const name = (descriptor === 'charge')
      ? 'a charge'
      : 'an offensive foul';
    return tokenize`${player(personId, { teamId })} is called for ${name}`;
  }

  if (descriptor === 'take' || descriptor === 'transition take') {
    return tokenize`${player(personId, { teamId })} commits a take foul`;
  }

  if (descriptor === 'loose ball') {
    return tokenize`${player(personId, { teamId })} commits a loose ball foul`;
  }

  const quals = new Set(['1freethrow', '2freethrow', '3freethrow']);
  const shootingQual = qualifiers.find((q) => quals.has(q));
  const shotsAtTheLine = ({
    '1freethrow': 1,
    '2freethrow': 2,
    '3freethrow': 3,
  })[shootingQual];
  if (shotsAtTheLine) {
    return tokenize`${player(personId, { teamId })} fouls
      ${player(foulDrawnPersonId, { role: 'object' })},
      sending
      ${player(foulDrawnPersonId, { role: 'object' })}
      to the line to shoot ${apnumber(shotsAtTheLine)}`;
  }
  return tokenize`${player(personId, { teamId })} fouls
    ${player(foulDrawnPersonId, { role: 'object' })}`;
};

const foul = function foul(play) {
  const {
    teamId,
  } = play;

  const nodes = getNodes(play);

  if (!nodes) {
    return block(play, {
      nodes: [text(play.description)],
    });
  }

  return block(play, {
    teamId,
    result: 'disadvantage',
    nodes,
  });
};

export default foul;
