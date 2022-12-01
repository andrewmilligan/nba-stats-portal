import classnames from 'classnames';

import styles from './styles.module.scss';

const TeamLabel = function TeamLabel(props) {
  const {
    currentLead,
    color,
    teamName,
  } = props;

  const isInLead = currentLead > 0;

  return (
    <div className={styles.container}>
      <div
        className={classnames(
          styles.teamLabel,
          { [styles.isInLead]: isInLead },
        )}
      >
        {isInLead && (
          <span
            className={styles.currentLead}
            style={{ color }}
          >
            {`+${currentLead} `}
          </span>
        )}
        {teamName}
      </div>
    </div>
  );
};

export default TeamLabel;
