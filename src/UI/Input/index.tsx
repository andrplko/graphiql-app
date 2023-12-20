import { InputHTMLAttributes } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  registration?: Partial<UseFormRegisterReturn>;
  error?: FieldError | undefined;
  errorClassName?: string;
}

const Input = ({
  id,
  label,
  registration,
  error,
  errorClassName,
  ...props
}: InputProps) => {
  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.label}>
        <span className={styles.text}>{label}</span>
        <input
          id={id}
          {...registration}
          {...props}
          className={`${styles.input} ${props.className}`}
        />
      </label>
      <div role="alert" className={`${styles.error} ${errorClassName}`}>
        {error?.message && error.message}
      </div>
    </div>
  );
};

export default Input;
