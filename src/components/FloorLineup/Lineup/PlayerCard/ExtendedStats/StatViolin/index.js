import classnames from 'classnames';
import { scaleLinear, scaleBand } from 'd3-scale';
import { extent, max, bin, mean } from 'd3-array';
import { area, curveCatmullRom as curve } from 'd3-shape';

import useResizeObserver from 'Utils/hooks/useResizeObserver';

import styles from './styles.module.scss';

const StatViolin = function StatViolin(props) {
  const {
    seasonBoxScores,
    current,
    stat,
    bins: numBins,
    label,
    formatLabel,
  } = props;

  const margin = { top: 0, right: 6, bottom: 0, left: 6 };
  const [ref, [width]] = useResizeObserver();
  const height = 40;
  const viewBox = [
    -margin.left,
    -margin.top,
    width + margin.left + margin.right,
    height + margin.top + margin.bottom,
  ];

  const statAccessor = (d) => d[stat];

  const statDomain = extent([
    current,
    ...extent(seasonBoxScores, (d) => d[stat]),
  ]);
  const statScale = scaleLinear()
    .domain(statDomain)
    .range([margin.left, width])
    .nice();

  const histogram = bin()
    .domain(statScale.domain())
    .thresholds(statScale.ticks(numBins))
    .value(statAccessor);

  const bins = histogram(seasonBoxScores);
  const seasonAverage = mean(seasonBoxScores, statAccessor);

  const maxHeight = max(bins, (d) => d.length);
  const heightScale = scaleLinear()
    .domain([-maxHeight, maxHeight])
    .range([height, 0]);

  const statArea = area()
    .x((d) => statScale((d.x0 + d.x1) / 2))
    .y1((d) => heightScale(d.length))
    .y0((d) => heightScale(-d.length))
    .curve(curve);

  const [start, end] = statScale.domain();
  const statPoints = [
    { x0: start, x1: start, length: 0 },
    ...bins,
    { x0: end, x1: end, length: 0 },
  ];

  return (
    <>
      <div className={styles.chartLabel}>
        {label}
      </div>
      <div className={classnames(styles.label, styles.left)}>
        {formatLabel(statScale.domain()[0])}
      </div>
      <div ref={ref} className={styles.chartContainer}>
        <svg
          width={width}
          height={height}
          viewBox={viewBox}
        >
          <path
            d={statArea(statPoints)}
            className={styles.violin}
          />
          <rect
            x={statScale(seasonAverage) - 1}
            y={heightScale(0) - 10}
            width={2}
            height={20}
            className={styles.seasonAverage}
          />
          {typeof current !== 'undefined' && (
            <>
              <rect
                x={Math.min(statScale(current), statScale(seasonAverage))}
                y={heightScale(0) - 0.5}
                width={Math.abs(statScale(current) - statScale(seasonAverage))}
                height={1}
                className={styles.seasonAverage}
              />
              <circle
                cx={statScale(current)}
                cy={heightScale(0)}
                r="6"
                className={styles.current}
              />
            </>
          )}
        </svg>
      </div>
      <div className={classnames(styles.label, styles.right)}>
        {formatLabel(statScale.domain()[1])}
      </div>
    </>
  );
};

StatViolin.defaultProps = {
  bins: 10,
  formatLabel: (x) => `${x}`,
};

export default StatViolin;
