import { RecoilRoot } from 'recoil';
import { useInitializeDailyScoreboard } from './dailyScoreboard';
import { useInitializeRecords } from './records';
import { initSchedule, useInitializeSchedule } from './schedule';
import { initGame, useInitializeGameMetadata } from './game';

const initializeState = function initializeState(opts = {}) {
  const {
    nbaDates,
    wnbaDates,
    gameMetadata,
  } = opts;

  return (snapshot) => {
    initSchedule(snapshot, { nbaDates, wnbaDates });

    if (gameMetadata) {
      initGame(snapshot, { gameMetadata });
    }
  };
};

const AtomsHydrator = function AtomsHydrator(props) {
  const {
    gameMetadata,
  } = props;

  useInitializeSchedule();
  useInitializeDailyScoreboard('nba');
  useInitializeDailyScoreboard('wnba');
  useInitializeRecords();
  useInitializeGameMetadata(gameMetadata);

  return null;
};

const AtomsRoot = function AtomsRoot(props) {
  const {
    pageProps,
    children,
  } = props;

  const {
    nbaDates,
    wnbaDates,
    gameMetadata,
  } = pageProps;

  const init = initializeState({
    nbaDates,
    wnbaDates,
    gameMetadata,
  });

  return (
    <RecoilRoot initializeState={init}>
      <AtomsHydrator
        gameMetadata={gameMetadata}
      />
      {children}
    </RecoilRoot>
  );
};

export default AtomsRoot;
