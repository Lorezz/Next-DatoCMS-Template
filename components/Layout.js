import Head from 'next/head';
import { Flex } from '@chakra-ui/react';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <Flex height="100vh" width="100vw" direction="column" overflow="hidden">
        <NavBar />
        {children}
      </Flex>
    </>
  );
};

export default Layout;
