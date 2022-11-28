import { useMemo } from 'react';

import styles from './styles.module.scss';

const GridLines = function GridLines(props) {
  const {
    leadScale,
    clockScale,
  } = props;

  const maxTime = clockScale.domain()[1];
  const width = clockScale.range()[1];
  const height = leadScale.range()[1];

  const periods = useMemo(() => {
    const periodMarkers = [];
    let totalTime = 0;
    while (totalTime < maxTime) {
      const period = periodMarkers.length + 1;
      const periodLength = 60 * (period > 4 ? 5 : 12);
      const periodType = (period > 4 ? 'OT' : 'Q')
      const periodNum = period - (period > 4 ? 4 : 0);
      const label = `${periodType}${periodNum}`;
      periodMarkers.push({
        seconds: totalTime,
        label,
      });
      totalTime += periodLength;
    }
    return periodMarkers;
  }, [maxTime]);

  return (
    <g>
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
    </g>
  );
};

export default GridLines;
