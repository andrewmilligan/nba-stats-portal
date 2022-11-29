import Link from 'next/link';

import Well from 'Components/Well';
import logo from 'Images/logo.svg';

import styles from './styles.module.scss';

const Footer = function Footer() {
  return (
    <Well>
      <footer className={styles.container}>
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
        <div>
          All data comes from the NBA.
          {' '}
          <a href="https://www.nba.com/">
            See more at nba.com.
          </a>
        </div>
      </footer>
    </Well>
  );
};

export default Footer;
