import { RecoilRoot } from 'recoil';

const AtomsRoot = function AtomsRoot({ children }) {
  return (
    <RecoilRoot>
      {children}
    </RecoilRoot>
  );
};

export default AtomsRoot;
