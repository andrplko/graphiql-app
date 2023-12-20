import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Routes } from '@/constants/routes';
import { auth, logout } from '@/lib/firebase/firebase';
import Button from '@/UI/Button';
import styles from './AuthButtons.module.scss';

const AuthButtons = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  if (user) {
    return (
      <Button type="button" onClick={logout}>
        Sign Out
      </Button>
    );
  }

  return (
    <div className={styles.container}>
      <Button type="button" onClick={() => router.push(Routes.SIGN_IN)}>
        Sign In
      </Button>
      <Button type="button" onClick={() => router.push(Routes.SIGN_UP)}>
        Sign Up
      </Button>
    </div>
  );
};

export default AuthButtons;
