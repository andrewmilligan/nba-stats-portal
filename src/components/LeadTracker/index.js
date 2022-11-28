import { useId, useMemo, useCallback } from 'react';
import { scaleLinear } from 'd3-scale';
import { area, line, curveStepAfter } from 'd3-shape';

import teamColors from 'Utils/teams/colors';
import playerMinutes from 'Utils/clock/playerMinutes';
import useResizeObserver from 'Utils/hooks/useResizeObserver';

import LeadTickLabels from './LeadTickLabels';
import GridLines from './GridLines';
import styles from './styles.module.scss';

const LeadTracker = function LeadTracker(props) {
  const {
    boxScore,
    playByPlay,
  } = props;

  const {
    homeTeam: {
      teamId: homeTeamId,
    },
    awayTeam: {
      teamId: awayTeamId,
    },
  } = boxScore;

  const homeGradientId = useId();
  const awayGradientId = useId();

  const homeColor = (teamColors.get(homeTeamId) || [])[0];
  const awayColor = (teamColors.get(awayTeamId) || [])[0];

  const [ref, [width]] = useResizeObserver();
  const height = 100;

  const eventToSeconds = useCallback((event) => {
    const { clock, period } = event;
    const pastPeriods = [...Array(period - 1)]
      .reduce((total, _, i) => total + 60 * (i < 4 ? 12 : 5), 0);
    const periodLength = 60 * (period > 4 ? 5 : 12);
    const { minutes, seconds } = playerMinutes(clock);
    const secondsIntoPeriod = periodLength - ((minutes * 60) + seconds);
    return pastPeriods + secondsIntoPeriod;
  }, []);

  const events = useMemo(() => (
    playByPlay
      .reduce((es, e) => {
        const home = +e.scoreHome;
        const away = +e.scoreAway;
        const homeLead = home - away;
        const seconds = eventToSeconds(e);
        const newEvent = {
          seconds,
          period: e.period,
          homeLead,
        };
        if (es.length < 1) {
          return [newEvent];
        }
        const oldHomeLead = es[es.length - 1].homeLead;
        if (
          (oldHomeLead < 0 && homeLead > 0)
          || (oldHomeLead > 0 && homeLead < 0)
        ) {
          return [
            ...es,
            {
              seconds,
              period: e.period,
              homeLead: 0,
            },
            newEvent,
          ];
        }
        return [
          ...es,
          newEvent,
        ];
      }, [])
      .sort((a, b) => (
        a.seconds - b.seconds
      ))
  ), [playByPlay, eventToSeconds]);

  const { maxLead, maxTime, maxPeriod } = useMemo(() => (
    events.reduce((maxes, e) => ({
      maxLead: Math.max(maxes.maxLead, Math.abs(e.homeLead)),
      maxTime: Math.max(maxes.maxTime, e.seconds),
    }), { maxLead: 0, maxTime: 0, maxPeriod: 1 })
  ), [events]);

  const clockScale = useMemo(() => (
    scaleLinear()
      .domain([0, maxTime])
      .range([0, width])
  ), [width, maxTime]);

  const leadScale = scaleLinear()
    .domain([-maxLead, maxLead])
    .range([0, height]);

  const homeArea = area()
    .x((event) => clockScale(event.seconds))
    .y1(({ homeLead }) => (
      leadScale(Math.max(0, homeLead))
    ))
    .y0(leadScale(0))
    .curve(curveStepAfter);

  const homeLine = line()
    .x((event) => clockScale(event.seconds))
    .y(({ homeLead }) => (
      leadScale(Math.max(0, homeLead))
    ))
    .defined(({ homeLead }) => (
      homeLead >= 0
    ))
    .curve(curveStepAfter);

  const awayArea = area()
    .x((event) => clockScale(event.seconds))
    .y1(({ homeLead }) => (
      leadScale(Math.min(0, homeLead))
    ))
    .y0(leadScale(0))
    .curve(curveStepAfter);

  const awayLine = line()
    .x((event) => clockScale(event.seconds))
    .y(({ homeLead }) => (
      leadScale(Math.min(0, homeLead))
    ))
    .defined(({ homeLead }) => (
      homeLead <= 0
    ))
    .curve(curveStepAfter);

  const gradientStop = (color, opacity) => ({
    stopColor: color,
    stopOpacity: opacity,
  });

  const quarters = [
    { period: 1, clock: 'PT12M0S', label: 'Q1' },
    { period: 2, clock: 'PT12M0S', label: 'Q2' },
    { period: 3, clock: 'PT12M0S', label: 'Q3' },
    { period: 4, clock: 'PT12M0S', label: 'Q4' },
    { period: 4, clock: 'PT0M0S' },
  ];

  const getLeadBottom = () => {
    const leadEvent = events[events.length - 1];
    const lead = leadScale(leadEvent.homeLead);
    const max = leadScale.range()[1];
    return `${(lead / max) * 100}%`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.chart}>
        <LeadTickLabels scale={leadScale} />
        <div ref={ref} className={styles.chartContainer}>
          <svg
            width={width}
            height={height}
            viewBox={[0, 0, width, height]}
            className={styles.canvas}
          >
            <defs>
              <linearGradient
                id={homeGradientId}
                x1="0"
                y1={leadScale(maxLead)}
                x2="0"
                y2={leadScale(0)}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" style={gradientStop(homeColor, 0.5)} />
                <stop offset="100%" style={gradientStop(homeColor, 0.05)} />
              </linearGradient>
              <linearGradient
                id={awayGradientId}
                x1="0"
                y1={leadScale(-maxLead)}
                x2="0"
                y2={leadScale(0)}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" style={gradientStop(awayColor, 0.5)} />
                <stop offset="100%" style={gradientStop(awayColor, 0.05)} />
              </linearGradient>
            </defs>
            <path
              d={homeArea(events)}
              fill={`url(#${homeGradientId})`}
            />
            <path
              d={awayArea(events)}
              fill={`url(#${awayGradientId})`}
            />
            <path
              d={homeLine(events)}
              fill="none"
              stroke={homeColor}
            />
            <path
              d={awayLine(events)}
              fill="none"
              stroke={awayColor}
            />

            {/* x axis */}
            <line
              x1="0"
              x2={width}
              y1={leadScale(0)}
              y2={leadScale(0)}
              className={styles.axis}
            />

            {/* y grid lines */}
            {quarters.map((quarter, i) => (
              <line
                key={i}
                x1={clockScale(eventToSeconds(quarter))}
                x2={clockScale(eventToSeconds(quarter))}
                y1="0"
                y2={height}
                className={styles.axis}
              />
            ))}

          </svg>
          <div className={styles.quarterLabels}>
            {quarters.map((quarter, i) => (
              quarter.label && (
                <div
                  key={i}
                  className={styles.quarterLabel}
                  style={{
                    left: `${clockScale(eventToSeconds(quarter)) / width * 100}%`,
                  }}
                >
                  {quarter.label}
                </div>
              )
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

LeadTracker.defaultProps = {
  boxScore: {
    homeTeam: {},
    awayTeam: {},
  },
  playByPlay: [],
};

export default LeadTracker;
