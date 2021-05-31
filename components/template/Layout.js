import Head from 'next/head';
import { Flex, Container } from '@chakra-ui/react';
import Header from 'components/template/Header';
import Footer from 'components/template/Footer';

const Layout = ({ children }) => {
  return (
    <Flex
      minHeight="100vh"
      width="100vw"
      direction="column"
      overflow="hidden"
      justify="space-between">
      <Header />
      {children}
      <Footer />
    </Flex>
  );
};

export default Layout;
