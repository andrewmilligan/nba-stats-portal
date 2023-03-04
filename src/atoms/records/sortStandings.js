const sortStandings = function sortStandings(standings) {
  return standings
    .map((team) => {
      const { record } = team;
      const winPct = record.wins / record.losses;
      return {
        ...team,
        record: {
          ...record,
          winPercentage: winPct,
        },
      };
    })
    .sort((a, b) => (
      b.record.winPercentage - a.record.winPercentage
    ))
    .map((team, i, standing) => {
      const leader = standing[0];
      const winDiff = leader.record.wins - team.record.wins;
      const lossDiff = team.record.losses - leader.record.losses;
      const gamesBack = (winDiff / 2) + (lossDiff / 2);
      return {
        ...team,
        record: {
          ...team.record,
          gamesBack,
        },
      };
    });
};

export default sortStandings;
