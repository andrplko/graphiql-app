import { FieldValues, SubmitHandler } from 'react-hook-form';
import Form from '../Form';
import validationSchema from '@/utils/validation/validationSchema';
import Input from '@/UI/Input';
import Button from '@/UI/Button';
import AuthLink from '@/UI/AuthLink';
import { Routes } from '@/constants/routes';
import styles from './SignInForm.module.scss';

interface FormFields extends FieldValues {
  email: string;
  password: string;
}

const onSubmit: SubmitHandler<FormFields> = (data) => console.log(data);

const SignInForm = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign In</h1>
      <Form<FormFields> schema={validationSchema} onSubmit={onSubmit}>
        {({ register, formState: { errors, isDirty, isValid } }) => (
          <>
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="Email"
              registration={register('email')}
              error={errors.email}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="Password"
              registration={register('password')}
              error={errors.password}
            />
            <Button type="submit" disabled={!isDirty || !isValid}>
              Sing In
            </Button>
            <AuthLink href={Routes.SignUp} />
          </>
        )}
      </Form>
    </div>
  );
};

export default SignInForm;
