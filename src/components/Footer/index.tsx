import RSLogo from '@/UI/RSLogo';
import Wrapper from '../../UI/Wrapper';
import styles from './Footer.module.scss';

const Footer = () => {
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
            Andrei
          </a>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;
