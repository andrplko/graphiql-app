import { useEffect, useReducer } from 'react';
import router from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import { Routes } from '@/constants/routes';
import { auth } from '@/lib/firebase/firebase';
import useAxiosFetch from '@/hooks/useAxiosFetch';
import EndpointChanger from '@/components/EndpointChanger';
import Editor from '@/components/Editor';
import GraphqlExplorer from '@/components/GraphqlExplorer';
import DocExplorer from '@/components/DocExplorer';
import EditorTools from '@/components/EditorTools';
import parseRequestData from '@/utils/parseRequestData';
import {
  Types,
  initialState,
  mainPageReducer,
} from '@/reducers/mainPageReducer';
import styles from '@/styles/MainPage.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const MainPage = () => {
  const [state, dispatch] = useReducer(mainPageReducer, initialState);
  const {
    endpoint,
    query,
    variables,
    headers,
    parsedVariables,
    parsedHeaders,
    stringifiedData,
  } = state;

  const { data, loading } = useAxiosFetch(
    endpoint,
    'post',
    { query, variables: parsedVariables },
    parsedHeaders
  );

  useEffect(() => {
    if (data) {
      dispatch({
        type: Types.SET_STRINGIFIED_DATA,
        payload: JSON.stringify(data, null, 2),
      });
    } else {
      dispatch({ type: Types.SET_STRINGIFIED_DATA, payload: '' });
    }
  }, [data]);

  const handleEndpointSubmission = (value: string) => {
    dispatch({ type: Types.SET_ENDPOINT, payload: value });
  };

  const handleClickExecuteButton = (value: string) => {
    dispatch({ type: Types.SET_QUERY, payload: value });
    try {
      const { parsedHeaders, parsedVariables } = parseRequestData(
        headers,
        variables
      );
      dispatch({ type: Types.SET_PARSED_HEADERS, payload: parsedHeaders });
      dispatch({ type: Types.SET_PARSED_VARIABLES, payload: parsedVariables });
    } catch (error) {
      if (error instanceof Error) {
        dispatch({ type: Types.SET_STRINGIFIED_DATA, payload: error.message });
      }
    }
  };

  const handleUpdateVariables = (value: string) => {
    dispatch({ type: Types.SET_VARIABLES, payload: value });
  };

  const handleUpdateHeaders = (value: string) => {
    dispatch({ type: Types.SET_HEADERS, payload: value });
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
          <div className={styles.wrapper}>
            <Editor onClickExecuteButton={handleClickExecuteButton} />
            <EditorTools
              variables={variables}
              headers={headers}
              onUpdateVariables={handleUpdateVariables}
              onUpdateHeaders={handleUpdateHeaders}
            />
          </div>
        </article>
        <article className={styles.viewer}>
          <GraphqlExplorer
            loading={loading}
            value={stringifiedData}
            editable={false}
            readOnly={true}
            height="550px"
            basicSetup={{ foldGutter: false }}
          />
        </article>
      </section>
      <section className={styles.section}>
        <DocExplorer endpoint={endpoint} />
      </section>
      <ToastContainer />
    </div>
  );
};

export default MainPage;
