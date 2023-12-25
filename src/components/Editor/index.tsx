import { useState } from 'react';
import Image from 'next/image';
import GraphqlExplorer from '../GraphqlExplorer';
import ExecuteIcon from 'public/execute-icon.svg';
import PrettifyIcon from 'public/prettify-icon.svg';
import Button from '@/UI/Button';
import prettifyQuery from '@/utils/prettifyQuery';
import isValidSequenceBrackets from '@/utils/isValidSequenceBrackets';
import styles from './Editor.module.scss';

interface EditorProps {
  onClick: (value: string) => void;
}

const Editor = ({ onClick }: EditorProps) => {
  const [query, setQuery] = useState('');
  const isValid = isValidSequenceBrackets(query);

  const handleClickPrettify = () => {
    if (isValid) {
      const prettifiedValue = prettifyQuery(query, 2);
      setQuery(prettifiedValue);
    }
  };

  return (
    <>
      <GraphqlExplorer
        value={query}
        onChange={(value) => {
          setQuery(value);
        }}
        placeholder={'Type query'}
      />
      <div className={styles.wrapper}>
        <Button
          type="button"
          onClick={() => onClick(query)}
          className={styles.button}
        >
          <Image
            src={ExecuteIcon}
            alt="execute icon"
            width={16}
            height={16}
            className={styles.image}
          />
        </Button>
        <Button
          type="button"
          onClick={handleClickPrettify}
          className={styles.button}
          disabled={!isValid}
        >
          <Image
            src={PrettifyIcon}
            alt="prettify icon"
            width={16}
            height={16}
            className={styles.image}
          />
        </Button>
      </div>
    </>
  );
};

export default Editor;
