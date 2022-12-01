import { useMemo } from 'react';

import playerMinutes from 'Utils/clock/playerMinutes';

const usePlayByPlayEvents = function usePlayByPlayEvents(playByPlay) {
  return useMemo(() => {
    const eventToSeconds = (event) => {
      const { clock, period } = event;
      const pastPeriods = [...Array(period - 1)]
        .reduce((total, _, i) => total + 60 * (i < 4 ? 12 : 5), 0);
      const periodLength = 60 * (period > 4 ? 5 : 12);
      const { minutes, seconds } = playerMinutes(clock);
      const secondsIntoPeriod = periodLength - ((minutes * 60) + seconds);
      return pastPeriods + secondsIntoPeriod;
    };

    let maxTime = 0;
    let maxLead = 0;
    let maxPeriod = 0;

    const events = playByPlay
      .reduce((es, e) => {
        const { period } = e;
        const homeLead = +e.scoreHome - +e.scoreAway;
        const seconds = eventToSeconds(e);
        const newEvent = {
          seconds,
          period,
          homeLead,
        };

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
      const labelPrefix = period > 4 ? 'OT' : 'Q';
      const labelNum = period > 4 ? period - 4 : period;
      const minutes = (12 * Math.min(i, 4)) + (5 * Math.max(0, i - 4));
      const seconds = minutes * 60;
      return {
        period,
        seconds, 
        label: `${labelPrefix}${labelNum}`,
      };
    });

    return {
      events,
      maxTime,
      maxLead,
      maxPeriod,
      homeCurrentLead,
      awayCurrentLead,
      periods,
    };
  }, [playByPlay]);
};

export default usePlayByPlayEvents;
