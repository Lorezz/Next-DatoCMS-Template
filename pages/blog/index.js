import Link from 'next/link';
import {
  Box,
  Heading,
  Container,
  Text,
  SimpleGrid,
  Avatar
} from '@chakra-ui/react';
import { StructuredText } from 'react-datocms';

import { doQuery } from 'lib/api';
import * as queries from 'lib/queries';
import Layout from 'components/Layout';
import BreadCrumbs from 'components/BreadCrumbs';
import HeroImage from 'components/HeroImage';
import StructuredContent from 'components/StructuredContent';

const BlogIndexPage = ({ posts, page, layout }) => {
  const breadcrumbs = [
    { title: 'Home', path: '/' },
    { title: 'Blog', path: `/blog`, isCurrentPage: true }
  ];
  return (
    <Layout data={layout}>
      {page?.slideshow?.slides && <Slideshow slides={page.slideshow.slides} />}
      {page?.seo && <SEO tags={page.seo} />}
      {page?.pic && <HeroImage pic={page.pic} small={true} />}
      <Container maxW={'container.xl'} px={4} py={5} justify="flex-start">
        <BreadCrumbs paths={breadcrumbs} />
        <Heading as="h1" fontSize="6xl" py={10}>
          {page?.title}
        </Heading>
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
                  <a>
                    {post.pic && (
                      <Avatar title={post.title} src={post.pic.url} />
                    )}
                    <Text>{post.title}</Text>
                  </a>
                </Link>
                <StructuredText data={post.excerpt} />
              </Box>
            );
          })}
        </SimpleGrid>
      </Container>
    </Layout>
  );
};

export async function getStaticProps() {
  const response = await doQuery(queries.postList, null);
  const posts = response?.data?.posts || [];

  const slug = 'blog';
  const pageResponse = await doQuery(queries.page, { slug });
  const page = pageResponse?.data?.page || null;

  const site = await doQuery(queries.siteQuery, null);
  const layout = site.data;

  return {
    props: { posts, page, layout }
  };
}

export default BlogIndexPage;
