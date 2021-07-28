import { Box, Heading, Text, Container, SimpleGrid } from '@chakra-ui/react';
import { Image } from 'react-datocms';

import Layout from 'components/layout/Layout';
import Hero from 'components/heros/Hero';
import PostCard from 'components/cards/PostCard';
import ProfileCard from 'components/cards/ProfileCard';
import BreadCrumbs from 'components/layout/BreadCrumbs';

import * as queries from 'lib/queries';
import { doQuery } from 'lib/api';
import { getLayoutData } from 'lib/utils';

function Tag({ data, layout }) {
  const { name, pic, slug, matches } = data;

  const breadcrumbs = [
    { title: 'Home', path: '/' },
    { title: 'Tags', path: '/tags' },
    { title: name, path: `/tags/${slug}`, isCurrentPage: true }
  ];

  const noResults = !(matches?.people?.length || matches?.posts?.length);

  return (
    <Layout data={layout}>
      <Hero pic={pic} picSize={'big'} slideshow={null} />
      <Container maxW={'container.xl'} px={4} py={5}>
        <BreadCrumbs paths={breadcrumbs} />
        <Heading as="h1" fontSize="6xl" py={10}>
          {name}
        </Heading>
        {noResults && (
          <Text>Sorry This Tag is not associated to any Author or Post</Text>
        )}
        {matches?.people?.length > 0 && (
          <Box>
            <Heading as="h3">{'People'}</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              {matches?.people?.map((a) => {
                return <ProfileCard key={a.id} {...a} />;
              })}
            </SimpleGrid>
          </Box>
        )}
        {matches?.posts?.length > 0 && (
          <Box>
            <Heading as="h3">{'Posts'}</Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              {matches?.posts?.map((p) => {
                return <PostCard key={p.id} post={p} />;
              })}
            </SimpleGrid>
          </Box>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticPaths() {
  const response = await doQuery(queries.tagList, null);
  const tags = response?.data?.tags || [];
  const paths = tags.map((tag) => ({
    params: { tag: tag.slug }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { tag: slug } = params;
  const response = await doQuery(queries.tagBySlug, { slug });
  const tagData = response?.data?.tag;

  const { id } = tagData;
  const relatedData = await doQuery(queries.tagRelated, { id });
  const matches = relatedData?.data || null;
  const data = { ...tagData, matches };

  const site = await doQuery(queries.siteQuery, null);
  const layout = getLayoutData(site, tagData?.seo);

  return { props: { data, layout } };
}

export default Tag;
