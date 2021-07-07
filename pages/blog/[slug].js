import * as queries from 'lib/queries';
import { doQuery } from 'lib/api';
import { Box, Heading, Container } from '@chakra-ui/react';
import { Image } from 'react-datocms';

import Layout from 'components/Layout';
import StructuredContent from 'components/StructuredContent';
import BreadCrumbs from 'components/BreadCrumbs';

function Post({ post, layout }) {
  const breadcrumbs = [
    { title: 'Home', path: '/' },
    { title: 'Blog', path: '/blog' },
    { title: post.title, path: `/blog/${post.slug}`, isCurrentPage: true }
  ];
  return (
    <Layout data={layout}>
      {post?.seo && <SEO tags={post.seo} />}
      {post?.pic && (
        <Container
          maxW={{ base: '100vw', md: '95vw', lg: '90vw', xl: '80vw' }}
          px={4}
          py={5}>
          <Box>
            <Image data={post.pic.responsiveImage} width={600} />
          </Box>
        </Container>
      )}
      <Container maxW={'container.xl'} px={4} py={5}>
        <BreadCrumbs paths={breadcrumbs} />
        <Heading as="h1" fontSize="6xl" py={10}>
          {post?.title}
        </Heading>
        {post.excerpt && <StructuredContent content={post.excerpt} />}
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
  // console.log('RESPONSE', response);
  const { data } = response;
  const { post } = data;

  const site = await doQuery(queries.siteQuery, null);
  const layout = site.data;

  // Pass post data to the page via props
  return { props: { post, layout } };
}

export default Post;
