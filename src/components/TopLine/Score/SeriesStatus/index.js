import { FINAL } from 'Utils/gameStatus/statusFromLastAction';

import styles from './styles.module.scss';

const SeriesStatus = function SeriesStatus(props) {
  const {
    game: {
      state,
      metadata,
    },
  } = props;

  const {
    poRoundDesc,
    seriesConference,
    seriesGameNumber,
    seriesText,
  } = metadata;

  if (!metadata.poRoundDesc) {
    return null;
  }

  return (
    <div className={styles.container}>
      {state.status !== FINAL && (
        <div>
          {`${poRoundDesc}, ${seriesGameNumber} (${seriesConference})`}
        </div>
      )}
      <div>
        {seriesText}
      </div>
    </div>
  );
};

export default SeriesStatus;
