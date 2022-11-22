import TeamScore from './TeamScore';

const Score = function Score(props) {
  const {
    homeTeam,
    awayTeam,
  } = props;

  return (
    <div>
      <TeamScore team={homeTeam} />
      <TeamScore team={awayTeam} />
    </div>
  );
};

export default Score;
