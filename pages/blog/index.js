import Link from 'next/link';
import { Box, Heading, Container, SimpleGrid } from '@chakra-ui/react';

import Layout from 'components/layout/Layout';
import BreadCrumbs from 'components/layout/BreadCrumbs';
import Hero from 'components/heros/Hero';
import StructuredContent from 'components/StructuredContent';
import PostCard from 'components/cards/PostCard';
import SearchAlgolia from 'components/SearchAlgolia';

import { doQuery } from 'lib/api';
import * as queries from 'lib/queries';
import { getLayoutData } from 'lib/utils';

const BlogIndexPage = ({ posts, page, layout }) => {
  const breadcrumbs = [
    { title: 'Home', path: '/' },
    { title: 'Blog', path: `/blog`, isCurrentPage: true }
  ];
  return (
    <Layout data={layout}>
      <Hero pic={page?.pic} picSize={'small'} slideshow={page?.slideshow} />
      <Container maxW={'container.xl'} px={4} py={5} justify="flex-start">
        <BreadCrumbs paths={breadcrumbs} />
        <Heading as="h1" fontSize="6xl" py={10}>
          {page?.title}
        </Heading>

        <SearchAlgolia indexName={'dev_samples_posts'} type="blog" />

        {page?.excerpt && <StructuredContent content={page.excerpt} />}
        {page?.content && <StructuredContent content={page.content} />}

        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 3 }}
          spacing="8"
          p="10"
          rounded="lg">
          {posts?.map((post) => {
            return (
              <Box key={post.id}>
                <Link href={`/blog/${post.slug}`}>
                  <PostCard post={post} />
                </Link>
              </Box>
            );
          })}
        </SimpleGrid>
      </Container>
    </Layout>
  );
};

//  {
//    posts?.map((post) => {
//      return (
//        <Box key={post.id}>
//          <Link href={`/blog/${post.slug}`}>
//            <a>
//              {post.pic && <Avatar title={post.title} src={post.pic.url} />}
//              <Text>{post.title}</Text>
//            </a>
//          </Link>
//          <StructuredText data={post.excerpt} />
//        </Box>
//      );
//    });
//  }

export async function getStaticProps() {
  const response = await doQuery(queries.postList, null);
  const posts = response?.data?.posts || [];

  const slug = 'blog';
  const pageResponse = await doQuery(queries.page, { slug });
  const page = pageResponse?.data?.page || null;

  const site = await doQuery(queries.siteQuery, null);
  const layout = getLayoutData(site, page?.seo);

  return {
    props: { posts, page, layout }
  };
}

export default BlogIndexPage;
