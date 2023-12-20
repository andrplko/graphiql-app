import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import SignInForm from '@/components/SignInForm';
import { Routes } from '@/constants/routes';
import { auth } from '@/lib/firebase/firebase';
import { ToastContainer } from 'react-toastify';
import styles from '@/styles/SignInPage.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const SignInPage = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) router.push(Routes.MAIN);
  }, [user]);

  if (loading) {
    return null;
  }

  return (
    <div className={styles.container}>
      <SignInForm />
      <ToastContainer />
    </div>
  );
};

export default SignInPage;
