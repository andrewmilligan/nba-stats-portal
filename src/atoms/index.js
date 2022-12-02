import { RecoilRoot } from 'recoil';
import { useInitializeDailyScoreboard } from './dailyScoreboard';
import { initSchedule, useInitializeSchedule } from './schedule';
import { initGame, useInitializeGameMetadata } from './game';

const initializeState = function initializeState(opts = {}) {
  const {
    dates,
    gameMetadata,
  } = opts;

  return (snapshot) => {
    initSchedule(snapshot, { dates });

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
  useInitializeDailyScoreboard();
  useInitializeGameMetadata(gameMetadata);

  return null;
};

const AtomsRoot = function AtomsRoot(props) {
  const {
    pageProps,
    children,
  } = props;

  const {
    dates,
    gameMetadata,
  } = pageProps;

  return (
    <RecoilRoot initializeState={initializeState({ dates, gameMetadata })}>
      <AtomsHydrator
        gameMetadata={gameMetadata}
      />
      {children}
    </RecoilRoot>
  );
};

export default AtomsRoot;
