import { Flex, Box } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';
import SEO from './SEO';

const Layout = ({ data, children }) => {
  const { menu, footer, metatags } = data;
  return (
    <>
      <SEO tags={metatags} />
      <Flex
        minHeight="100vh"
        width="100vw"
        direction="column"
        // overflow="hidden"
        justify="space-between">
        <Header data={menu} />
        <Box>{children}</Box>
        <Footer data={footer} />
      </Flex>
    </>
  );
};

export default Layout;
