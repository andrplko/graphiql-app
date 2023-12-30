import { useEffect, useState } from 'react';
import { getIntrospectionQuery } from 'graphql';
import useAxiosFetch from '@/hooks/useAxiosFetch';
import GraphqlExplorer from '../GraphqlExplorer';
import { useLocaleContext } from '@/context/locales';
import styles from './DocExplorer.module.scss';

interface DocExplorerProps {
  endpoint: string;
}

const DocExplorer = ({ endpoint }: DocExplorerProps) => {
  const {
    localeData: { main_page },
  } = useLocaleContext();
  const [stringifiedData, setStringifiedData] = useState('');

  const { data, loading } = useAxiosFetch(endpoint, 'post', {
    query: getIntrospectionQuery(),
  });

  useEffect(() => {
    if (data) {
      setStringifiedData(JSON.stringify(data, null, 2));
    } else {
      setStringifiedData('');
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{main_page.doc.title}</h2>
      <GraphqlExplorer
        loading={loading}
        value={stringifiedData}
        editable={false}
        readOnly={true}
        height="400px"
      />
    </div>
  );
};

export default DocExplorer;
