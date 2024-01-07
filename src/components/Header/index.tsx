import { useEffect, useState } from 'react';
import classnames from 'classnames';
import Logo from '../Logo';
import UserNavigation from '../UserNavigation';
import Wrapper from '@/UI/Wrapper';
import styles from './Header.module.scss';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  const headerClassNames = classnames(styles.header, {
    [styles.sticky]: isSticky,
  });

  const handleScroll = () => {
    setIsSticky(window.scrollY >= 10);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={headerClassNames}>
      <Wrapper>
        <div className={styles.container}>
          <Logo />
          <UserNavigation />
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
