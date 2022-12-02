import { RecoilRoot } from 'recoil';
import { useInitializeDailyScoreboard } from './dailyScoreboard';
import { initSchedule } from './schedule';

const initializeState = function initializeState(opts = {}) {
  const {
    dates,
  } = opts;

  return (snapshot) => {
    initSchedule(snapshot, { dates });
  };
};

const AtomsHydrator = function AtomsHydrator() {
  useInitializeDailyScoreboard();

  return null;
};

const AtomsRoot = function AtomsRoot(props) {
  const {
    pageProps,
    children,
  } = props;

  const {
    dates,
  } = pageProps;

  return (
    <RecoilRoot initializeState={initializeState({ dates })}>
      <AtomsHydrator />
      {children}
    </RecoilRoot>
  );
};

export default AtomsRoot;
