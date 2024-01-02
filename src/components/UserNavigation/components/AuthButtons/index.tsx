import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Routes } from '@/constants/routes';
import { auth, logout } from '@/lib/firebase/firebase';
import Button from '@/UI/Button';
import { useLocaleContext } from '@/context/locales';
import styles from './AuthButtons.module.scss';

const AuthButtons = ({ ...rest }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const {
    localeData: { header },
  } = useLocaleContext();

  if (user) {
    return (
      <Button type="button" onClick={logout}>
        {header.auth_buttons.sing_out}
      </Button>
    );
  }

  return (
    <div className={styles.container} {...rest}>
      <Button type="button" onClick={() => router.push(Routes.SIGN_IN)}>
        {header.auth_buttons.sign_in}
      </Button>
      <Button type="button" onClick={() => router.push(Routes.SIGN_UP)}>
        {header.auth_buttons.sign_up}
      </Button>
    </div>
  );
};

export default AuthButtons;
