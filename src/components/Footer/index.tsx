import RSLogo from '@/UI/RSLogo';
import Wrapper from '../../UI/Wrapper';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Wrapper>
        <RSLogo />
      </Wrapper>
    </footer>
  );
};

export default Footer;
