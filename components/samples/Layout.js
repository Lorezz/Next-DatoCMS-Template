import { Flex } from '@chakra-ui/react';
import Header from 'components/samples/Header';
import Footer from 'components/samples/Footer';

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
