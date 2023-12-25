import { useEffect, useState } from 'react';
import router from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import GraphqlExplorer from '@/components/GraphqlExplorer';
import { Routes } from '@/constants/routes';
import { auth } from '@/lib/firebase/firebase';
import useAxiosFetch from '@/hooks/useAxiosFetch';
import EndpointChanger from '@/components/EndpointChanger';
import Editor from '@/components/Editor';
import styles from '@/styles/MainPage.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const MainPage = () => {
  const [query, setQuery] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [stringifiedData, setStringifiedData] = useState('');

  const { data, loading } = useAxiosFetch(
    endpoint,
    'post',
    { query },
    {
      'Content-Type': 'application/json',
    }
  );

  useEffect(() => {
    if (data) {
      setStringifiedData(JSON.stringify(data, null, 2));
    } else {
      setStringifiedData('');
    }
  }, [data]);

  const handleEndpointSubmission = (value: string) => {
    setEndpoint(value);
    setQuery('');
    setStringifiedData('');
  };

  const handleUpdateQuery = (value: string) => {
    setQuery(value);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push(Routes.WELCOME);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.container}>
      <EndpointChanger onSubmitEndpoint={handleEndpointSubmission} />
      <section className={styles.section}>
        <article className={styles.editor}>
          <Editor onClick={handleUpdateQuery} />
        </article>
        <article className={styles.viewer}>
          <GraphqlExplorer
            loading={loading}
            value={stringifiedData}
            editable={false}
            readOnly={true}
            basicSetup={{ foldGutter: false }}
          />
        </article>
      </section>
      <ToastContainer />
    </div>
  );
};

export default MainPage;
