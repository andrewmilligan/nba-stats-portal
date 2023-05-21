import { teamLogo } from 'Utils/data/urls';
import styles from './styles.module.scss';

const TeamLogo = function TeamLogo(props) {
  const {
    team,
    league,
  } = props;

  const {
    teamId,
    teamCity,
    teamName,
  } = team;
  const logo = teamLogo(teamId, { variant: 'D', league });

  return (
    <div className={styles.container}>
      <img
        className={styles.logo}
        src={logo}
        alt={logo && `${teamCity} ${teamName} logo`}
      />
    </div>
  );
};

TeamLogo.defaultProps = {
  league: 'nba',
  team: {},
};

export default TeamLogo;
