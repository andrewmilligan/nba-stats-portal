import parseClock from 'Utils/clock/parseClock';
import periodLabel from 'Utils/clock/periodLabel';
import teamMetadata from 'Utils/teams/metadata';

import {
  FINAL,
  PERIOD_END,
  TIMEOUT,
} from './statusFromLastAction';

const gameStatusTextFromState = function gameStatusTextFromState(
  state,
  opts = {},
) {
  const {
    status,
    period,
    clock,
    teamId,
  } = state;

  const {
    league = 'nba',
  } = opts;

  const { formattedMinutesSeconds } = parseClock(clock);
  const time = `${periodLabel(period)} ${formattedMinutesSeconds}`;

  if (status === FINAL) {
    return { text: 'Final' };
  }

  if (status === PERIOD_END) {
    if (period === 2) {
      return { text: 'Half' };
    }

    return { text: `End ${periodLabel(period)}` };
  }

  if (status === TIMEOUT) {
    const timeoutTeam = teamMetadata[league].get(teamId);
    return {
      text: time,
      subtext: timeoutTeam
        ? `Timeout ${timeoutTeam.teamTricode}`
        : 'Timeout',
    };
  }

  return { text: time };
};

export default gameStatusTextFromState;
