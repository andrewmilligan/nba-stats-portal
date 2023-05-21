import TeamScore from './TeamScore';

const Score = function Score(props) {
  const {
    homeTeam,
    awayTeam,
    isFinal,
    isLive,
    mode,
    league,
  } = props;

  const homeTeamLost = isFinal && (homeTeam.score < awayTeam.score);
  const awayTeamLost = isFinal && (awayTeam.score < homeTeam.score);

  return (
    <div>
      <TeamScore
        team={awayTeam}
        lost={awayTeamLost}
        isFinal={isFinal}
        isLive={isLive}
        mode={mode}
        league={league}
      />
      <TeamScore
        team={homeTeam}
        lost={homeTeamLost}
        isFinal={isFinal}
        isLive={isLive}
        mode={mode}
        league={league}
      />
    </div>
  );
};

Score.defaultProps = {
  isFinal: false,
};

export default Score;
