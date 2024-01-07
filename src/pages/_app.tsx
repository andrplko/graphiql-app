import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import useLoader from '@/hooks/useLoader';
import '@/styles/globals.scss';
import LocaleProvider from '@/context/locales';

const App = ({ Component, pageProps }: AppProps) => {
  useLoader();

  return (
    <LocaleProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LocaleProvider>
  );
};

export default App;
