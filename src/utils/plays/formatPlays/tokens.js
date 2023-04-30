import { v4 as uuidv4 } from 'uuid';
import { ordinal } from 'journalize';

export const text = (text) => ({
  id: uuidv4(),
  type: 'text',
  token: text.split(/\s+/).join(' '),
});

export const period = (periodNumber) => ({
  id: uuidv4(),
  type: 'period',
  token: periodNumber,
});

export const team = (teamId, syncTokenId) => ({
  id: uuidv4(),
  type: 'team',
  token: teamId,
  syncTokenId,
  role: 'subject',
});

export const teamVerb = (tokenId, verb) => ({
  id: uuidv4(),
  type: 'teamVerb',
  token: `${verb.plural || verb}<${tokenId}>`,
  teamTokenId: tokenId,
  verb,
});

export const player = (playerId, role = 'subject') => ({
  id: uuidv4(),
  type: 'player',
  token: playerId,
  role,
});

export const tokenize = (strings, ...ts) => {
  const tokens = [];
  strings.forEach((string, i) => {
    const t = i < ts.length ? ts[i] : '';
    const tokenIsString = typeof t !== 'object';
    const s = `${string}${tokenIsString ? t : ''}`;
    const lastToken = tokens[tokens.length - 1];
    if (s) {
      if (lastToken && lastToken.type === 'text') {
        tokens[tokens.length - 1] = text(`${lastToken.token}${s}`);
      } else {
        tokens.push(text(s));
      }
    }

    if (!tokenIsString) {
      tokens.push(t);
    }
  });
  return tokens;
};

export const block = (play, info) => {
  const {
    actionNumber,
    clock,
    timeActual,
    period,
  } = play;

  return {
    actionNumber,
    clock,
    timeActual,
    period,
    play,
    ...info,
  };
};

export const stringifyBlock = (block, context) => {
  const {
    nodes,
  } = block;

  const isCurrentSubject = (token) => {
    if (!context.currentSubject) return false;
    return (
      token.type === context.currentSubject.type
      && token.token === context.currentSubject.token
    );
  };

  const isSecondReference = (token) => {
    const id = `${token.type}:${token.token}`;
    return (context.referenceCounts.get(id) || 0) > 1;
  };

  // period, team, teamVerb, player, text
  const strings = nodes.map((token) => {
    if (token.type === 'text') {
      return {
        text: token.token,
      };
    }

    if (token.type === 'period') {
      if (token.token < 5) {
        return {
          text: `the ${ordinal(token.token, true)} quarter`,
        };
      }
      const otNum = token.token - 4;
      return {
        text: `the ${ordinal(otNum, true)} overtime period`,
      };
    }

    if (token.type === 'team') {
      if (isCurrentSubject(token)) {
        return {
          text: 'they',
        };
      }
      const team = context.teams.get(token.token);
      return {
        text: `the ${team.teamCity} ${team.teamName}`,
        currentSubject: token.role === 'subject'
          ? token
          : undefined,
        references: [`team:${token.token}`],
      };
    }

    if (token.type === 'teamVerb') {
      const v = token.verb;
      const verb = (typeof v === 'string')
        ? { plural: v, singular: v.slice(0, v.length - 1) }
        : v;
      return {
        text: verb.singular,
      };
    }

    if (token.type === 'player') {
      const player = context.players.get(token.token);
      if (isCurrentSubject(token)) {
        return {
          text: player.pronoun || 'he',
          references: [`player:${token.token}`],
        };
      }
      return {
        text: isSecondReference(token)
          ? player.familyName
          : player.name,
        currentSubject: token.role === 'subject'
          ? token
          : undefined,
        references: [`player:${token.token}`],
      };
    }

    return { text: '' };
  });

  return strings.reduce((text, node) => ({
    text: [text.text, node.text].filter(Boolean).join(''),
    currentSubject: node.currentSubject || text.currentSubject,
    references: [
      ...(text.references || []),
      ...(node.references || []),
    ],
  }), {});
};

export const stringify = (blocks, context) => {
  const getConjunction = (a, b) => {
    if (a.teamId === b.teamId) {
      return (a.result === b.result) ? 'and' : 'but';
    }
    return (a.result === b.result) ? 'but' : 'and';
  };

  let currentSubject = undefined;
  const referenceCounts = new Map();

  const bs = [blocks].flat();
  const content = bs.reduce((c, block, i) => {
    const ctx = {
      ...context,
      referenceCounts,
    };

    const lastBlock = c[c.length - 1];
    const isConjuncted = (
      lastBlock
      && lastBlock.conjunctedWith < 1
      && !lastBlock.block.isolated
      && !block.isolated
      // && Math.random() < 0.7
    );

    const {
      text,
      currentSubject: newCurrentSubject,
      references = [],
    } = stringifyBlock(
      block,
      {
        ...ctx,
        currentSubject: isConjuncted ? currentSubject : undefined,
      },
    );

    if (newCurrentSubject) {
      currentSubject = newCurrentSubject;
    }

    references.forEach((id) => {
      referenceCounts.set(id, (referenceCounts.get(id) || 0) + 1);
    });

    if (isConjuncted) {
      return [
        ...c,
        {
          type: 'conjunction',
          text: getConjunction(lastBlock.block, block),
        },
        {
          type: 'text',
          conjunctedWith: lastBlock.conjunctedWith + 1,
          text,
          block,
        },
      ];
    }

    return [
      ...c,
      {
        type: 'text',
        conjunctedWith: 0,
        text,
        block,
      },
    ];
  }, []);

  const sentences = content.reduce((string, block) => {
    if (block.type === 'conjunction') {
      const s = string[string.length - 1];
      string[string.length - 1] = `${s} ${block.text}`;
      return string;
    }

    if (block.conjunctedWith > 0) {
      const s = string[string.length - 1];
      string[string.length - 1] = `${s} ${block.text}`;
      return string;
    }

    return [...string, block.text];
  }, []);

  return sentences.map((sentence) => (
    `${sentence.charAt(0).toUpperCase()}${sentence.slice(1)}.`
  )).join(' ');
};
