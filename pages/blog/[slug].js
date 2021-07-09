import * as queries from 'lib/queries';
import { doQuery } from 'lib/api';
import { Box, Heading, Container } from '@chakra-ui/react';
import { Image } from 'react-datocms';

import Layout from 'components/Layout';
import StructuredContent from 'components/StructuredContent';
import BreadCrumbs from 'components/BreadCrumbs';
import HeroImage from 'components/HeroImage';

function Post({ post, layout }) {
  const breadcrumbs = [
    { title: 'Home', path: '/' },
    { title: 'Blog', path: '/blog' },
    { title: post.title, path: `/blog/${post.slug}`, isCurrentPage: true }
  ];
  return (
    <Layout data={layout}>
      {post?.pic && <HeroImage pic={post.pic} small={false} />}
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
  const response = await doQuery(queries.post, { slug });
  const post = response?.data?.post;

  const site = await doQuery(queries.siteQuery, null);
  const favicon = site?.data?.site?.favicon || [];
  const metatags = [...favicon, ...post.seo];
  const layout = { ...site.data, metatags };

  return { props: { post, layout } };
}

export default Post;
