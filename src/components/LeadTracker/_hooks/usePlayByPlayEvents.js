import { useMemo } from 'react';

import playerMinutes from 'Utils/clock/playerMinutes';
import secondsBeforePeriodStart from 'Utils/clock/secondsBeforePeriodStart';
import secondsInPeriod from 'Utils/clock/secondsInPeriod';
import periodLabel from 'Utils/clock/periodLabel';

const usePlayByPlayEvents = function usePlayByPlayEvents(playByPlay, opts = {}) {
  const {
    league = 'nba',
  } = opts;

  return useMemo(() => {
    let periodEnd = 0;
    let maxTime = 0;
    let maxLead = 0;
    let maxPeriod = 0;

    const events = playByPlay
      .reduce((es, e) => {
        const {
          period,
          seconds,
          scoreHome,
          scoreAway,
        } = e;
        const homeLead = scoreHome - scoreAway;
        const newEvent = {
          seconds,
          homeLead,
        };

        const endOfPeriod = (
          secondsBeforePeriodStart(period, { league })
          + secondsInPeriod(period, { league })
        );
        periodEnd = Math.max(periodEnd, endOfPeriod);
        maxTime = Math.max(maxTime, seconds);
        maxLead = Math.max(maxLead, Math.abs(homeLead));
        maxPeriod = Math.max(maxPeriod, period);

        // this is the first event
        if (es.length < 1) {
          return [newEvent];
        }

        // if lead changed add an extra point at the tie mark for step chart
        // to look right
        const oldHomeLead = es[es.length - 1].homeLead;
        if (
          (oldHomeLead < 0 && homeLead > 0)
          || (oldHomeLead > 0 && homeLead < 0)
        ) {
          return [
            ...es,
            {
              seconds,
              homeLead: 0,
            },
            newEvent,
          ];
        }

        // just add the event like normal
        return [
          ...es,
          newEvent,
        ];
      }, [])
      .sort((a, b) => (
        a.seconds - b.seconds
      ));

    const lastEvent = events[events.length - 1];
    const homeCurrentLead = lastEvent ? lastEvent.homeLead : 0;
    const awayCurrentLead = -homeCurrentLead;

    const periods = [...Array(maxPeriod)].map((_, i) => {
      const period = i + 1;
      const seconds = secondsBeforePeriodStart(period, { league });
      return {
        period,
        seconds, 
        label: periodLabel(period),
      };
    });

    return {
      events,
      maxTime,
      maxLead,
      maxPeriod,
      periodEnd,
      homeCurrentLead,
      awayCurrentLead,
      periods,
    };
  }, [playByPlay, league]);
};

export default usePlayByPlayEvents;
