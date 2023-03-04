import styles from './styles.module.scss';

const Header = function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        NBA Standings
      </div>
    </div>
  );
};

export default Header;
