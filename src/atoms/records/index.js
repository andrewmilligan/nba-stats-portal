import {
  atom,
  selector,
  selectorFamily,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

import useDataFetch from 'Utils/hooks/useDataFetch';
import { records } from 'Utils/data/urls';
import teamMetadata from 'Utils/teams/metadata';

import sortStandings from './sortStandings';

export const recordsAtom = atom({
  key: 'records.recordsAtom',
  default: undefined,
});

export const standingsSelector = selector({
  key: 'records.standingsSelector',
  get: ({ get }) => {
    const recs = get(recordsAtom) || {};
    const conferences = Object.entries(recs).reduce((standings, [teamId, record]) => {
      const team = teamMetadata.nba.get(+teamId);
      standings[team.conference].push({
        ...team,
        record,
      });
      return standings;
    }, { eastern: [], western: []});
    return {
      eastern: sortStandings(conferences.eastern),
      western: sortStandings(conferences.western),
    };
  },
});

export const teamRecordSelectorFamily = selectorFamily({
  key: 'records.teamRecordSelectorFamily',
  get: (teamId) => ({ get }) => {
    const recs = get(recordsAtom) || {};
    return recs[teamId] || {};
  },
});

export const useInitializeRecords = function useInitializeRecords() {
  const setRecords = useSetRecoilState(recordsAtom);
  useDataFetch(records(), {
    interval: 10000,
    onLoad: setRecords,
  });
};

export const useRecords = function useRecords() {
  return useRecoilValue(recordsAtom);
};

export const useStandings = function useStandings() {
  return useRecoilValue(standingsSelector);
};

export const useTeamRecord = function useTeamRecord(teamId) {
  return useRecoilValue(teamRecordSelectorFamily(teamId));
};
