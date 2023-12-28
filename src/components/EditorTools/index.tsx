import { useState } from 'react';
import Image from 'next/image';
import classnames from 'classnames';
import Button from '@/UI/Button';
import GraphqlExplorer from '../GraphqlExplorer';
import ChevronIcon from 'public/chevron-icon.svg';
import styles from './EditorTools.module.scss';

interface EditorToolsProps {
  variables: string;
  headers: string;
  onUpdateVariables: (value: string) => void;
  onUpdateHeaders: (value: string) => void;
}

const EditorTools = ({
  variables,
  headers,
  onUpdateVariables,
  onUpdateHeaders,
}: EditorToolsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const toggleOpen = () => setIsOpen(!isOpen);

  const handleClick = (value: number) => {
    setVisibleIndex(value);
  };

  const chevronImageClassNames = classnames(styles.image, {
    [styles.opened]: isOpen,
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.wrapper}>
          <Button
            type="button"
            onClick={() => handleClick(0)}
            className={classnames(styles.button, {
              [styles.active]: visibleIndex === 0,
            })}
          >
            Variables
          </Button>
          <Button
            type="button"
            onClick={() => handleClick(1)}
            className={classnames(styles.button, {
              [styles.active]: visibleIndex === 1,
            })}
          >
            Headers
          </Button>
        </div>
        <Button type="button" onClick={toggleOpen} className={styles.button}>
          <Image
            src={ChevronIcon}
            alt="chevron icon"
            width={16}
            height={16}
            className={chevronImageClassNames}
          />
        </Button>
      </div>
      {isOpen && (
        <>
          {visibleIndex === 0 && (
            <div className={styles.tool}>
              <GraphqlExplorer
                value={variables}
                onChange={(value) => {
                  onUpdateVariables(value);
                }}
                height="100px"
              />
            </div>
          )}
          {visibleIndex === 1 && (
            <div className={styles.tool}>
              <GraphqlExplorer
                value={headers}
                onChange={(value) => {
                  onUpdateHeaders(value);
                }}
                height="100px"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EditorTools;
