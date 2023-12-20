import Link from 'next/link';
import { useRouter } from 'next/router';
import classnames from 'classnames';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Routes } from '@/constants/routes';
import AuthButtons from './components/AuthButtons';
import { auth } from '@/lib/firebase/firebase';
import styles from './UserNavigation.module.scss';

const UserNavigation = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  const isWelcomePage = router.pathname === Routes.WELCOME;
  const isMainPage = router.pathname === Routes.MAIN;

  const linkWelcomeClassName = classnames(styles.link, {
    [styles.activeWelcome]: isWelcomePage,
  });

  const linkMainClassName = classnames(styles.link, {
    [styles.activeMain]: isMainPage,
  });

  if (loading) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href={Routes.WELCOME} legacyBehavior>
          <a className={linkWelcomeClassName}>Welcome</a>
        </Link>
        {user && (
          <Link href={Routes.MAIN} legacyBehavior>
            <a className={linkMainClassName}>Main</a>
          </Link>
        )}
      </div>
      <AuthButtons />
    </div>
  );
};

export default UserNavigation;
