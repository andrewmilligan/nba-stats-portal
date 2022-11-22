import TeamScore from './TeamScore';

const Score = function Score(props) {
  const {
    homeTeam,
    awayTeam,
    isFinal,
    isLive,
  } = props;

  const homeTeamLost = isFinal && (homeTeam.score < awayTeam.score);
  const awayTeamLost = isFinal && (awayTeam.score < homeTeam.score);

  return (
    <div>
      <TeamScore
        team={homeTeam}
        lost={homeTeamLost}
        isFinal={isFinal}
        isLive={isLive}
      />
      <TeamScore
        team={awayTeam}
        lost={awayTeamLost}
        isFinal={isFinal}
        isLive={isLive}
      />
    </div>
  );
};

Score.defaultProps = {
  isFinal: false,
};

export default Score;
