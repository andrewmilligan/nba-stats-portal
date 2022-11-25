import TeamLogo from './TeamLogo';
import StatsCard from './StatsCard';

const TopLine = function TopLine(props) {
  const {
    team,
  } = props;

  return (
    <div>
      <TeamLogo team={team} />
      <StatsCard team={team} />
    </div>
  );
};

export default TopLine;
