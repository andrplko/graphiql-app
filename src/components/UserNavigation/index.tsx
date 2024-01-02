import Link from 'next/link';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Routes } from '@/constants/routes';
import AuthButtons from './components/AuthButtons';
import Button from '@/UI/Button';
import { auth } from '@/lib/firebase/firebase';
import { useLocaleContext } from '@/context/locales';
import { REGIONS } from '@/context/locales/constants';
import styles from './UserNavigation.module.scss';
import { useEffect, useState } from 'react';

const UserNavigation = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const {
    language,
    setLanguage,
    localeData: { header },
  } = useLocaleContext();
  const [isShow, setIsShow] = useState(false);
  const handleClickOutsideBurger = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('[data-id="menu"]')) {
      setIsShow(false);
    }
  };

  const handleRouteChange = () => {
    setIsShow(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideBurger);

    return () => {
      document.removeEventListener('click', handleClickOutsideBurger);
    };
  }, []);

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  const isWelcomePage = router.pathname === Routes.WELCOME;
  const isMainPage = router.pathname === Routes.MAIN;

  const linkWelcomeClassName = classnames(styles.link, {
    [styles.activeWelcome]: isWelcomePage,
  });

  const linkMainClassName = classnames(styles.link, {
    [styles.activeMain]: isMainPage,
  });

  const handleClickLocalization = () => {
    setLanguage(language === REGIONS.EN ? REGIONS.BEL : REGIONS.EN);
  };

  const toggleBurger = () => {
    setIsShow(!isShow);
  };

  if (loading) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href={Routes.WELCOME} legacyBehavior>
          <a className={linkWelcomeClassName}>{header.links.welcome}</a>
        </Link>
        {user && (
          <Link href={Routes.MAIN} legacyBehavior>
            <a className={linkMainClassName}>{header.links.main}</a>
          </Link>
        )}
      </div>
      <div
        className={`${styles.burger} ${isShow ? styles['active-burger'] : ''}`}
        data-id="menu"
      >
        <Button
          type="button"
          onClick={handleClickLocalization}
          className={styles.btn}
        >
          {language}
        </Button>
        <AuthButtons className={styles['auth-btns']} />
      </div>
      <button
        className={`${styles['burger-btn']} ${
          isShow ? styles['active-btn'] : ''
        }`}
        data-id="menu"
        onClick={toggleBurger}
      >
        <span></span>
      </button>
    </div>
  );
};

export default UserNavigation;
