import { useState } from 'react';
import Image from 'next/image';
import GraphqlExplorer from '../GraphqlExplorer';
import ExecuteIcon from 'public/execute-icon.svg';
import PrettifyIcon from 'public/prettify-icon.svg';
import Button from '@/UI/Button';
import prettifyQuery from '@/utils/prettifyQuery';
import isValidSequenceBrackets from '@/utils/isValidSequenceBrackets';
import { useLocaleContext } from '@/context/locales';
import styles from './Editor.module.scss';

interface EditorProps {
  onClickExecuteButton: (value: string) => void;
}

const Editor = ({ onClickExecuteButton }: EditorProps) => {
  const {
    localeData: { main_page },
  } = useLocaleContext();
  const [query, setQuery] = useState('');
  const isValid = isValidSequenceBrackets(query);

  const handleClickPrettify = () => {
    if (isValid) {
      const prettifiedValue = prettifyQuery(query);
      setQuery(prettifiedValue);
    }
  };

  return (
    <div className={styles.container}>
      <GraphqlExplorer
        value={query}
        onChange={(value) => {
          setQuery(value);
        }}
        placeholder={main_page.editor.placeholder}
        height="390px"
      />
      <div className={styles.wrapper}>
        <Button
          type="button"
          onClick={() => onClickExecuteButton(query)}
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
    </div>
  );
};

export default Editor;
