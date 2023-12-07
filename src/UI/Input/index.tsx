import { InputHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  registration?: Partial<UseFormRegisterReturn>;
  error?: FieldError | undefined;
}

const Input = ({ id, label, registration, error, ...props }: InputProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>
        {label}
        <input id={id} {...registration} {...props} className={styles.input} />
      </label>
      <div role="alert" className={styles.error}>
        {error?.message && error.message}
      </div>
    </div>
  );
};

export default Input;
