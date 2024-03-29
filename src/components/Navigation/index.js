import Link from 'next/link';

import logo from 'Images/logo.svg';
import Well from 'Components/Well';
import Games from './Games';

import styles from './styles.module.scss';

const Navigation = function Navigation(props) {
  const {
    withGames,
  } = props;

  return (
    <nav className={styles.container}>
      <Well className={styles.content}>
        <div className={styles.brand}>
          <Link
            href="/"
            className={styles.brandLink}
          >
            <img
              className={styles.logo}
              src={logo.src}
              alt="basketball stats logo"
            />
          </Link>
        </div>
        {withGames && (
          <Games />
        )}
      </Well>
    </nav>
  );
};

Navigation.defaultProps = {
  withGames: false,
};

export default Navigation;
