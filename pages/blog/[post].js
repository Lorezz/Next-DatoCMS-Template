import { Box, HStack, Heading, Container } from '@chakra-ui/react';

import Layout from 'components/layout/Layout';
import BreadCrumbs from 'components/layout/BreadCrumbs';
import StructuredContent from 'components/StructuredContent';
import Hero from 'components/heros/Hero';
import TagBadge from 'components/blocks/TagBadge';
import BlogAuthor from 'components/blocks/BlogAuthor';

import * as queries from 'lib/queries';
import { doQuery } from 'lib/api';
import { getLayoutData } from 'lib/utils';

const Post = ({ post, layout }) => {
  const breadcrumbs = [
    { title: 'Home', path: '/' },
    { title: 'Blog', path: '/blog' },
    { title: post.title, path: `/blog/${post.slug}`, isCurrentPage: true }
  ];
  return (
    <Layout data={layout}>
      <Hero pic={post?.pic} picSize={'big'} slideshow={null} />
      <Container maxW={'container.xl'} px={4} py={5}>
        <BreadCrumbs paths={breadcrumbs} />
        <Heading as="h1" fontSize="6xl" py={4}>
          {post?.title}
        </Heading>
        {post?.author && (
          <BlogAuthor author={post?.author} date={post?._firstPublishedAt} />
        )}
        <HStack spacing={2} alignItems="center">
          {post?.tags?.map((tag) => (
            <TagBadge {...tag} key={tag.id} />
          ))}
        </HStack>
        <Box mb={10}>
          {post.excerpt && <StructuredContent content={post.excerpt} />}
        </Box>
        <Box py={10}>
          {post.content && <StructuredContent content={post.content} />}
        </Box>
      </Container>
    </Layout>
  );
};

export async function getStaticPaths() {
  const response = await doQuery(queries.postList, null);
  const posts = response?.data?.posts || [];
  const paths = posts.map((post) => ({
    params: { post: post.slug }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { post: slug } = params;
  const response = await doQuery(queries.post, { slug });
  const post = response?.data?.post;

  const site = await doQuery(queries.siteQuery, null);
  const layout = getLayoutData(site, post?.seo);

  return { props: { post, layout } };
}

export default Post;
