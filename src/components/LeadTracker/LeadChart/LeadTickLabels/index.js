import styles from './styles.module.scss';

const LeadTickLabels = function LeadTickLabels(props) {
  const {
    scale,
    numTicks,
  } = props;

  const height = scale.range()[1];

  return (
    <div className={styles.container}>
      {scale.ticks(numTicks).map((tick) => (
        <div
          key={tick}
          className={styles.scoreLabel}
          style={{
            bottom: `${scale(tick) / height * 100}%`,
          }}
        >
          {Math.abs(tick)}
        </div>
      ))}
    </div>
  );
};

LeadTickLabels.defaultProps = {
  numTicks: 3,
};

export default LeadTickLabels;
