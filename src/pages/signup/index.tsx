import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import SignUpForm from '@/components/SignUpForm';
import { Routes } from '@/constants/routes';
import { auth } from '@/lib/firebase/firebase';
import styles from '@/styles/SignUpPage.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const SignUpPage = () => {
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
      <SignUpForm />
      <ToastContainer />
    </div>
  );
};

export default SignUpPage;
