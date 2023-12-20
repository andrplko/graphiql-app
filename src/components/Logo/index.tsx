import Link from 'next/link';
import Image from 'next/image';
import LogoIcon from '/public/logo.svg';
import { Routes } from '@/constants/routes';
import styles from './Logo.module.scss';

const Logo = () => {
  return (
    <div className={styles.container}>
      <Link href={Routes.WELCOME} className={styles.link}>
        <Image src={LogoIcon} width={50} height={50} alt="logo" />
        <h1 className={styles.title}>GraphiQL</h1>
      </Link>
    </div>
  );
};

export default Logo;
