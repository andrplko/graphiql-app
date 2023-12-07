import Link from 'next/link';
import { Routes } from '@/constants/routes';
import styles from './AuthLink.module.scss';

const AuthLink = ({ href }: { href: string }) => {
  const isSingUp =
    href === Routes.SignUp
      ? { text: "Don't have an account?", label: 'Sing Up' }
      : { text: 'Already have an account?', label: 'Sing In' };

  return (
    <div className={styles.container}>
      <span>{isSingUp.text}</span>
      <Link href={href} className={styles.link}>
        {isSingUp.label}
      </Link>
    </div>
  );
};

export default AuthLink;
