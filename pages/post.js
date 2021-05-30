import { Flex, Container } from '@chakra-ui/react';

import Cta from 'components/template/Cta';
import Post from 'components/template/Post';
import Newsletter from 'components/template/Newsletter';
import Gallery from 'components/template/Gallery';
import Layout from 'components/template/Layout';

const page = () => {
  return (
    <Layout>
      <Post />
      <Gallery />
      <Cta />
      <Newsletter />
    </Layout>
  );
};
export default page;
