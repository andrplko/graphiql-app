import Wrapper from '../Wrapper';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <Wrapper>
        <div className={styles.container}>
          <h1 className={styles.title}>GraphiQL App</h1>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
