import { FormEvent } from 'react';
import Image from 'next/image';
import Button from '@/UI/Button';
import Input from '@/UI/Input';
import ChangeIcon from '/public/change-icon.svg';
import { useLocaleContext } from '@/context/locales';
import styles from './EndpointChanger.module.scss';

interface EndpointChangerProps {
  onSubmitEndpoint: (value: string) => void;
}

const EndpointChanger = ({ onSubmitEndpoint }: EndpointChangerProps) => {
  const {
    localeData: { main_page },
  } = useLocaleContext();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = formData.get('endpoint');

    if (value && typeof value === 'string') {
      onSubmitEndpoint(value);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          id="endpoint"
          name="endpoint"
          type="text"
          placeholder={main_page.endpoint_changer.placeholder}
          className={styles.input}
          errorClassName={styles.error}
        />
        <Button type="submit" className={styles.button}>
          <Image src={ChangeIcon} alt="change icon" className={styles.image} />
        </Button>
      </form>
    </div>
  );
};

export default EndpointChanger;
