import { useStandings } from 'Atoms/records';

import Header from './Header';
import Conference from './Conference';
import styles from './styles.module.scss';

const Standings = function Standings() {
  const standings = useStandings();
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.standings}>
        <Conference
          conference="Western"
          standings={standings.western}
        />
        <Conference
          conference="Eastern"
          standings={standings.eastern}
        />
      </div>
    </div>
  );
};

export default Standings;
