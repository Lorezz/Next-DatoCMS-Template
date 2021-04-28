import { Flex, Container } from '@chakra-ui/react';

import Header from 'components/template/Header';
import Footer from 'components/template/Footer';
import Cta from 'components/template/Cta';
import Post from 'components/template/Post';
import Newsletter from 'components/template/Newsletter';

const page = () => {
  return (
    <Flex
      minHeight="100vh"
      width="100vw"
      direction="column"
      overflow="hidden"
      justify="space-between">
      <Header />
      <Container maxW={'7xl'}>
        <Post />
        <Cta />
        <Newsletter />
      </Container>
      <Footer />
    </Flex>
  );
};
export default page;
