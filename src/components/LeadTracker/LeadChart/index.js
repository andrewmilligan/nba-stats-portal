import { useId, useMemo } from 'react';
import classnames from 'classnames';

import useResizeObserver from 'Utils/hooks/useResizeObserver';

import useScales from './_hooks/useScales';
import GradientDef from './GradientDef';
import Area from './Area';
import LeadTickLabels from './LeadTickLabels';
import styles from './styles.module.scss';

const LeadChart = function LeadChart(props) {
  const {
    homeColor,
    awayColor,
    maxLead,
    maxTime,
    events,
    periods,
    periodEnd,
    homeCurrentLead,
  } = props;

  const leadColor = useMemo(() => {
    if (homeCurrentLead > 0) return homeColor;
    if (homeCurrentLead < 0) return awayColor;
    return undefined;
  }, [homeCurrentLead, homeColor, awayColor]);

  const [ref, [width]] = useResizeObserver();
  const height = 100;
  const viewBox = [0, 0, width, height]
  const margin = { top: 4, right: 4, bottom: 4, left: 0 };

  const homeGradientId = useId();
  const awayGradientId = useId();

  const {
    clockScale,
    leadScale,
    homeArea,
    homeLine,
    awayArea,
    awayLine,
  } = useScales({
    maxTime: periodEnd,
    maxLead,
    width,
    height,
    margin,
  });

  return (
    <div className={styles.chart}>
      <LeadTickLabels scale={leadScale} />
      <div ref={ref} className={styles.chartContainer}>
        <svg
          width={width}
          height={height}
          viewBox={viewBox}
        >
          <defs>
            <GradientDef
              id={homeGradientId}
              y1={leadScale(maxLead)}
              y2={leadScale(0)}
              color={homeColor}
            />
            <GradientDef
              id={awayGradientId}
              y1={leadScale(-maxLead)}
              y2={leadScale(0)}
              color={awayColor}
            />
          </defs>

          {/* x grid lines */}
          {leadScale.ticks(3).map((tick) => (
            <line
              key={tick}
              x1={clockScale.range()[0]}
              x2={clockScale.range()[1]}
              y1={leadScale(tick)}
              y2={leadScale(tick)}
              className={styles.axisSubtle}
            />
          ))}

          <Area
            area={homeArea(events)}
            line={homeLine(events)}
            fill={`url(#${homeGradientId})`}
            stroke={homeColor}
          />
          <Area
            area={awayArea(events)}
            line={awayLine(events)}
            fill={`url(#${awayGradientId})`}
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
          {periods.map((period, i) => (
            <line
              key={i}
              x1={clockScale(period.seconds)}
              x2={clockScale(period.seconds)}
              y1="0"
              y2={height}
              className={styles.axis}
            />
          ))}

          <circle
            cx={clockScale(maxTime)}
            cy={leadScale(homeCurrentLead)}
            r="4"
            className={classnames({
              [styles.leadMarker]: !leadColor,
            })}
            fill={leadColor}
          />

        </svg>
        <div className={styles.quarterLabels}>
          {periods.map((period, i) => (
            <div
              key={i}
              className={styles.quarterLabel}
              style={{
                left: `${clockScale(period.seconds) / width * 100}%`,
              }}
            >
              {period.label}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default LeadChart;
