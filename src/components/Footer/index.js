import Link from 'next/link';

import Well from 'Components/Well';

import styles from './styles.module.scss';

const Footer = function Footer() {
  return (
    <Well>
      <footer className={styles.container}>
        All data comes from the NBA.
        {' '}
        <a href="https://www.nba.com/">
          See more at nba.com.
        </a>
      </footer>
    </Well>
  );
};

export default Footer;
