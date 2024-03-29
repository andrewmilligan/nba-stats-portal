import { useMemo, useCallback } from 'react';
import classnames from 'classnames';

import teamMetadata from 'Utils/teams/metadata';
import teamColors from 'Utils/teams/sideColors';

import usePlayByPlayEvents from './_hooks/usePlayByPlayEvents';
import TeamLabel from './TeamLabel';
import LeadChart from './LeadChart';
import styles from './styles.module.scss';

const LeadTracker = function LeadTracker(props) {
  const {
    game,
    league,
  } = props;

  const {
    boxScore,
    playByPlay,
  } = game;

  const {
    homeTeam: {
      teamId: homeTeamId,
    },
    awayTeam: {
      teamId: awayTeamId,
    },
  } = boxScore;

  const homeTeam = teamMetadata[league].get(homeTeamId);
  const awayTeam = teamMetadata[league].get(awayTeamId);

  const homeColor = (teamColors[league].get(homeTeamId) || [])[0];
  const awayColor = (teamColors[league].get(awayTeamId) || [])[1];

  const {
    events,
    maxLead,
    maxTime,
    periodEnd,
    homeCurrentLead,
    awayCurrentLead,
    periods,
  } = usePlayByPlayEvents(playByPlay, { league });

  return (
    <div className={styles.container}>
      <TeamLabel
        currentLead={awayCurrentLead}
        color={awayColor}
        teamName={awayTeam.teamName}
      />

      <LeadChart
        homeColor={homeColor}
        awayColor={awayColor}
        maxLead={maxLead}
        maxTime={maxTime}
        periodEnd={periodEnd}
        events={events}
        periods={periods}
        homeCurrentLead={homeCurrentLead}
      />

      <TeamLabel
        currentLead={homeCurrentLead}
        color={homeColor}
        teamName={homeTeam.teamName}
      />
    </div>
  );
};

LeadTracker.defaultProps = {
  boxScore: {
    homeTeam: {},
    awayTeam: {},
  },
  playByPlay: [],
  league: 'nba',
};

export default LeadTracker;
