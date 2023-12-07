import SignInForm from '@/components/SignInForm';
import styles from '@/styles/SignInPage.module.scss';

const SignInPage = () => {
  return (
    <div className={styles.container}>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
