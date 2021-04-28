import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import Router from 'next/router';
import theme from 'theme';
import NProgress from 'nprogress';

import { StateProvider } from 'lib/ctx';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <StateProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" type="image/x-icon" href="/favicon.png" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@700&family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Component {...pageProps} />
      </StateProvider>
    </ChakraProvider>
  );
}
export default App;
