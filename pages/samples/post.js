import { Container } from '@chakra-ui/react';

import Cta from 'components/samples/Cta';
import Post from 'components/samples/Post';
import Newsletter from 'components/samples/Newsletter';
import Gallery from 'components/samples/Gallery';
import Layout from 'components/samples/Layout';

const page = () => {
  return (
    <Layout>
      <Container maxW={'7xl'} p="12">
        <Post />
        <Gallery />
        <Cta />
        <Newsletter />
      </Container>
    </Layout>
  );
};
export default page;
