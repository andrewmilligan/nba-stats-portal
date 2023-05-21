import { useCallback, useRef, useState, useEffect } from 'react';
import { formatPlays, stringify } from 'Utils/plays/formatPlays';
import parseClock from 'Utils/clock/parseClock';
import periodLabel from 'Utils/clock/periodLabel';
import styles from './styles.module.scss';

const PlaySequence = function PlaySequence(props) {
  const {
    plays,
    game: {
      boxScore: {
        homeTeam,
        awayTeam,
      },
    },
    league,
  } = props;

  const teams = new Map([
    [homeTeam.teamId, homeTeam],
    [awayTeam.teamId, awayTeam],
  ]);
  const allPlayers = [...homeTeam.players, ...awayTeam.players];
  const players = new Map(allPlayers.map((player) => [
    player.personId,
    player,
  ]));
  const context = {
    teams,
    players,
    league,
  };
  const formattedPlays = formatPlays(plays);
  const finalText = stringify(formattedPlays, context);

  const timer = useRef();
  const [text, setText] = useState('');
  const updateText = useCallback((t) => {
    timer.current = setTimeout(() => {
      setText(t);
      timer.current = null;
    }, 50);
  }, []);

  useEffect(() => {
    if (timer.current) return;
    if (text === finalText) return;
    const textArray = text ? text.split(' ') : [];
    const finalArray = finalText ? finalText.split(' ') : [];
    const stemEndIndex = finalArray
      .findIndex((c, i) => c !== textArray[i]);

    if (stemEndIndex < textArray.length) {
      updateText(textArray.slice(0, textArray.length - 1).join(' '));
    } else if (stemEndIndex < finalArray.length) {
      const c = finalArray[stemEndIndex];
      updateText([text, c].filter(Boolean).join(' '));
    } else {
      updateText(finalText);
    }
  }, [text, finalText, updateText]);

  const lastPlay = plays[plays.length - 1];
  const period = lastPlay && periodLabel(lastPlay.period);
  const clock = lastPlay && parseClock(lastPlay.clock);

  return (
    <div
      className={styles.container}
    >
      {clock && (
        <div className={styles.clock}>
          {`${period} ${clock.formattedMinutesSeconds}`}
        </div>
      )}
      <div className={styles.text}>
        {text}
      </div>
    </div>
  );
};

export default PlaySequence;
