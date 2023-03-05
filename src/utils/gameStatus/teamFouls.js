const teamFouls = function teamFouls(playByPlay) {
  const lastAction = playByPlay[playByPlay.length - 1];
  const currentPeriod = lastAction.period;
  const fouls = playByPlay.reduce((periodFouls, play) => {
    const {
      teamId,
      period,
      actionType,
      subType,
    } = play;

    if (period !== currentPeriod) return periodFouls;
    if (actionType !== 'foul') return periodFouls;
    if (subType === 'offensive') return periodFouls;

    if (!periodFouls.has(teamId)) {
      periodFouls.set(teamId, {
        total: [],
        lastTwoMinutes: [],
      });
    }
    periodFouls.get(teamId).total.push(play);
    if (play.secondsLeftInPeriod <= 120) {
      periodFouls.get(teamId).lastTwoMinutes.push(play);
    }

    return periodFouls;
  }, new Map());

  const getNumFouls = (fls) => {
    const numTotal = fls.total.length;
    const numLast2 = fls.lastTwoMinutes.length;
    if (numTotal >= 5 || numLast2 >= 2) return 5;
    if (numLast2 > 0) return 4;
    return numTotal;
  };

  const foulEntries = [...fouls].map(([teamId, fls]) => (
    [teamId, getNumFouls(fls)]
  ));
  return Object.fromEntries(foulEntries);
};

export default teamFouls;
