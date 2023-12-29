import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import useLoader from '@/hooks/useLoader';
import '@/styles/globals.scss';

const App = ({ Component, pageProps }: AppProps) => {
  useLoader();

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
