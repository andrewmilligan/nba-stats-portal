import Link from 'next/link';
import classnames from 'classnames';

import gamePath from 'Utils/routes/games/gamePath';
import gameStatusText from 'Utils/gameStatus/gameStatusText';
import { ONGOING_CODE, COMPLETE_CODE } from 'Utils/gameStatus/statuses';

import Status from './Status';
import Score from './Score';
import styles from './styles.module.scss';

const GameSummaryCard = function GameSummaryCard(props) {
  const {
    gameDate,
    game,
    mode,
    border,
    league,
  } = props;

  const {
    gameStatus,
    gameDateTime,
    homeTeam,
    awayTeam,
  } = game;

  const status = gameStatusText(game);
  const isFinal = gameStatus === COMPLETE_CODE;
  const isLive = gameStatus === ONGOING_CODE;

  const url = (league === 'nba')
    ? gamePath({ gameDate, game })
    : '/';

  return (
    <Link
      href={url}
      className={classnames(
        styles.container,
        styles[mode],
        { [styles.border]: border },
      )}
    >
      <Status
        gameStatus={gameStatus}
        gameStatusText={status}
      />
      <Score
        homeTeam={homeTeam}
        awayTeam={awayTeam}
        isFinal={isFinal}
        isLive={isLive}
        mode={mode}
        league={league}
      />
    </Link>
  );
};

GameSummaryCard.defaultProps = {
  mode: 'default',
  border: true,
  league: 'nba',
};

export default GameSummaryCard;
