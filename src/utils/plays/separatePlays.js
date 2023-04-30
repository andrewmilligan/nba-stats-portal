const isBoundary = function isBoundary(play, i, plays) {
  const {
    actionType,
    subType,
    shotResult,
  } = play;

  const nextPlay = plays[i + 1];

  if (actionType === 'period' && subType === 'end') return true;
  if (actionType === 'timeout') return true;

  if (actionType === 'steal') return true;

  if (actionType === 'jumpball') return true;

  if (actionType === 'turnover') {
    if (!nextPlay) return true;
    return nextPlay.actionType !== 'steal';
  }

  // defensive rebounds are always boundaries
  if (actionType === 'rebound' && subType === 'defensive') return true;

  // fouls are always boundaries
  if (actionType === 'foul') {
    if (!nextPlay) return true;
    const isOffensiveTurnover = (
      nextPlay.actionType === 'turnover'
      && nextPlay.subType === 'offensive foul'
    );
    return !isOffensiveTurnover;
  }

  if (actionType === 'violation' && subType === 'defensive goaltending') return true;

  // last free throw is a boundary
  if (actionType === 'freethrow') {
    const [shotNum, shots] = subType.split(' of ');
    return shotResult === 'Made' && shotNum === shots;
  }

  // clean made shots are boundaries, but we should include the foul on an
  // and-one or goaltending
  if (shotResult === 'Made') {
    if (!nextPlay) return true;

    // and-one
    const isAndOne = (
      nextPlay.actionType === 'foul'
      && nextPlay.descriptor === 'shooting'
      && nextPlay.qualifiers.includes('1freethrow')
    );

    // goaltending
    const isGoalTending = (
      nextPlay.actionType === 'violation'
      && nextPlay.subType === 'defensive goaltending'
    );

    return !isAndOne && !isGoalTending;
  }

  return false;
};

const ignorePlay = function ignorePlay(play, i, plays) {
  const {
    actionType,
    subType,
  } = play;

  const lastPlay = plays[i - 1] || {};
  const {
    actionType: lastActionType,
  } = lastPlay;

  if (actionType === 'substitution') return true;

  // block info is included in the missed shot
  if (actionType === 'block') return true;

  // steal info is included in the turnover
  if (actionType === 'steal') return true;

  if (actionType === 'violation' && subType === 'defensive goaltending') {
    return true;
  }

  if (
    actionType === 'rebound'
    && lastActionType === 'freethrow'
    && lastPlay.shotResult === 'Missed'
  ) {
    const [shotNum, shots] = lastPlay.subType.split(' of ');
    return shotNum !== shots;
  }

  return false;
};

const collapsePlay = function collapsePlay(play, i, plays) {
  const {
    actionType,
    subType,
  } = play;

  const lastPlay = plays[i - 1];
  const nextPlay = plays[i + 1];
  if (actionType === 'freethrow') {
    if (nextPlay && nextPlay.actionType === 'freethrow') {
      return null;
    }

    const previousFreethrows = [];
    let j = i - 1;
    while (plays[j].actionType === 'freethrow') {
      previousFreethrows.push(plays[j]);
      j -= 1;
    }

    return {
      ...play,
      previousFreethrows,
    };
  }

  return play;
};

const separatePlays = function separatePlays(playByPlay) {
  const possessions = playByPlay
    .filter((play, i, allPlays) => !ignorePlay(play, i, allPlays))
    .map(collapsePlay)
    .filter(Boolean)
    .reduce((plays, play, i, allPlays) => {
      plays[plays.length - 1].push(play);
      if (isBoundary(play, i, allPlays)) {
        plays.push([]);
      }
      return plays;
    }, [[]]);
  return possessions;
};

export default separatePlays;
