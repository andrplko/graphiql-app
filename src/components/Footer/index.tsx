import RSLogo from '@/UI/RSLogo';
import Wrapper from '../../UI/Wrapper';
import { useLocaleContext } from '@/context/locales';
import styles from './Footer.module.scss';

const Footer = () => {
  const {
    localeData: { footer },
  } = useLocaleContext();

  return (
    <footer className={styles.footer}>
      <Wrapper>
        <div className={styles.container}>
          <RSLogo />
          <p className={styles.year}>2023</p>
          <a
            href="https://github.com/andrplko"
            className={styles.github}
            rel="noreferrer"
            target="_blank"
            title="Andrei Paleshka GitHub"
          >
            {footer.team_members.member}
          </a>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
