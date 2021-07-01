import * as queries from 'lib/queries';
import { doQuery } from 'lib/api';
import { Box, Heading, Container } from '@chakra-ui/react';
import { Image, StructuredText } from 'react-datocms';

import Layout from 'components/template/Layout';
import StructuredContent from 'components/StructuredContent';

function Post({ post }) {
  return (
    <Layout>
      <Container maxW={'container.xl'} px={4} py={5}>
        {post?.pic && (
          <Box>
            <Image data={post.pic.responsiveImage} width={600} />
          </Box>
        )}
        <Heading as="h1" fontSize="6xl" py={10}>
          {post?.title}
        </Heading>
        {post.excerpt && <StructuredText data={post.excerpt} />}
        {post.content && <StructuredContent content={post.content} />}
      </Container>
    </Layout>
  );
}

export async function getStaticPaths() {
  const response = await doQuery(queries.postList, null);
  const posts = response?.data?.posts || [];
  const paths = posts.map((post) => ({
    params: { slug: post.slug }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  console.log('slug', slug);
  const response = await doQuery(queries.post, { slug });
  console.log('RESPONSE', response);
  const { data } = response;
  const { post } = data;

  // Pass post data to the page via props
  return { props: { post } };
}

export default Post;
