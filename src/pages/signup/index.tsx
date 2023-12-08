import SignUpForm from '@/components/SignUpForm';
import styles from '@/styles/SignUpPage.module.scss';

const SignUpPage = () => {
  return (
    <div className={styles.container}>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
