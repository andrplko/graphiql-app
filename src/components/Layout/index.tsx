import Head from 'next/head';
import { PropsWithChildren } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import ErrorBoundary from '../ErrorBoundary';
import Wrapper from '../../UI/Wrapper';
import { jost } from '@/utils/fonts';
import styles from './Layout.module.scss';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Head>
        <title>GraphiQL</title>
        <meta property="og:title" content="GraphiQL" key="title" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.container} ${jost.className}`}>
        <ErrorBoundary>
          <Header />
          <main className={styles.main}>
            <Wrapper>{children}</Wrapper>
          </main>
          <Footer />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default Layout;
