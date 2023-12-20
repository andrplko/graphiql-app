import { useEffect } from 'react';
import router from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { Routes } from '@/constants/routes';
import { auth } from '@/lib/firebase/firebase';
import styles from '@/styles/MainPage.module.scss';

const MainPage = () => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace(Routes.MAIN);
      } else {
        router.push(Routes.WELCOME);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Main page</h1>
    </div>
  );
};

export default MainPage;
