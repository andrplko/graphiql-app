import Link from 'next/link';
import { Routes } from '@/constants/routes';
import { useLocaleContext } from '../../context/locales/index';
import styles from './AuthLink.module.scss';

interface AuthLinkProps {
  href: string;
}

const AuthLink = ({ href }: AuthLinkProps) => {
  const {
    localeData: { sign_in_page, sign_up_page },
  } = useLocaleContext();

  const isSingUpOrSignIn =
    href === Routes.SIGN_UP
      ? {
          text: sign_in_page.auth_link.text,
          label: sign_in_page.auth_link.label,
        }
      : {
          text: sign_up_page.auth_link.text,
          label: sign_up_page.auth_link.label,
        };

  return (
    <div className={styles.container}>
      <span>{isSingUpOrSignIn.text}</span>
      <Link href={href} className={styles.link}>
        {isSingUpOrSignIn.label}
      </Link>
    </div>
  );
};

export default AuthLink;
