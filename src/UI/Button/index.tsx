import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={`${styles.button} ${props.className}`}>
      {children}
    </button>
  );
};

export default Button;
