import { FieldValues, SubmitHandler } from 'react-hook-form';
import { logInWithEmailAndPassword } from '@/lib/firebase/firebase';
import Form from '../Form';
import validationSchema from '@/utils/validation/validationSchema';
import Input from '@/UI/Input';
import Button from '@/UI/Button';
import AuthLink from '@/UI/AuthLink';
import { Routes } from '@/constants/routes';
import { useLocaleContext } from '@/context/locales';
import styles from './SignInForm.module.scss';

interface FormFields extends FieldValues {
  email: string;
  password: string;
}

const onSubmit: SubmitHandler<FormFields> = (data) => {
  const { email, password } = data;
  logInWithEmailAndPassword(email, password);
};

const SignInForm = () => {
  const { localeData } = useLocaleContext();
  const { sign_in_page } = localeData;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{sign_in_page.title}</h2>
      <Form<FormFields>
        schema={validationSchema(localeData)}
        onSubmit={onSubmit}
      >
        {({ register, formState: { errors, isDirty, isValid } }) => (
          <>
            <Input
              id="email"
              label={sign_in_page.email}
              type="email"
              placeholder={sign_in_page.email}
              registration={register('email')}
              error={errors.email}
            />
            <Input
              id="password"
              label={sign_in_page.password}
              type="password"
              placeholder={sign_in_page.password}
              registration={register('password')}
              error={errors.password}
            />
            <Button type="submit" disabled={!isDirty || !isValid}>
              {sign_in_page.button}
            </Button>
            <AuthLink href={Routes.SIGN_UP} />
          </>
        )}
      </Form>
    </div>
  );
};

export default SignInForm;
