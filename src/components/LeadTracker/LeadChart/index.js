import { useId, useMemo } from 'react';

import useResizeObserver from 'Utils/hooks/useResizeObserver';

import usePeriods from './_hooks/usePeriods';
import useScales from './_hooks/useScales';
import GradientDef from './GradientDef';
import Area from './Area';
import LeadTickLabels from './LeadTickLabels';
import styles from './styles.module.scss';

const LeadChart = function LeadChart(props) {
  const {
    homeColor,
    awayColor,
    maxPeriod,
    maxLead,
    maxTime,
    events,
  } = props;

  const [ref, [width]] = useResizeObserver();
  const height = 100;

  const homeGradientId = useId();
  const awayGradientId = useId();

  const periods = usePeriods(maxPeriod);

  const {
    clockScale,
    leadScale,
    homeArea,
    homeLine,
    awayArea,
    awayLine,
  } = useScales({
    maxTime,
    maxLead,
    width,
    height,
  });

  return (
    <div className={styles.chart}>
      <LeadTickLabels scale={leadScale} />
      <div ref={ref} className={styles.chartContainer}>
        <svg
          width={width}
          height={height}
          viewBox={[0, 0, width, height]}
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
