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

const UserNavigation = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const {
    language,
    setLanguage,
    localeData: { header },
  } = useLocaleContext();

  const isWelcomePage = router.pathname === Routes.WELCOME;
  const isMainPage = router.pathname === Routes.MAIN;

  const handleClickLocalization = () => {
    setLanguage(language === REGIONS.EN ? REGIONS.BEL : REGIONS.EN);
  };

  if (loading) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href={Routes.WELCOME} legacyBehavior>
          <a
            className={classnames(styles.link, {
              [styles.active]: isWelcomePage,
            })}
          >
            {header.links.welcome}
          </a>
        </Link>
        {user && (
          <Link href={Routes.MAIN} legacyBehavior>
            <a
              className={classnames(styles.link, {
                [styles.active]: isMainPage,
              })}
            >
              {header.links.main}
            </a>
          </Link>
        )}
      </div>
      <div className={styles.buttons_wrapper}>
        <Button type="button" onClick={handleClickLocalization}>
          {language}
        </Button>
        <AuthButtons />
      </div>
    </div>
  );
};

export default UserNavigation;
