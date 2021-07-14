import { Box, Heading, Text, Container } from '@chakra-ui/react';
import { Image } from 'react-datocms';

import Layout from 'components/Layout';
import HeroImage from 'components/HeroImage';
import PostCard from 'components/PostCard';
import ProfileCard from 'components/ProfileCard';
import BreadCrumbs from 'components/BreadCrumbs';

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
      <Box position="relative" h="full">
        {pic && <Image data={pic.responsiveImage} />}

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
              {matches?.people?.map((a) => {
                return <ProfileCard key={a.id} {...a} />;
              })}
            </Box>
          )}
          {matches?.posts?.length > 0 && (
            <Box>
              <Heading as="h3">{'Posts'}</Heading>
              {matches?.posts?.map((p) => {
                return <PostCard key={p.id} post={p} />;
              })}
            </Box>
          )}
        </Container>
      </Box>
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
