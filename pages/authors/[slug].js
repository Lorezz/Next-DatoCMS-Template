import { Box, Text, Container, VStack } from '@chakra-ui/react';
import { Image } from 'react-datocms';

import Layout from 'components/Layout';
import BreadCrumbs from 'components/BreadCrumbs';

import { doQuery } from 'lib/api';
import { getLayoutData } from 'lib/utils';
import * as queries from 'lib/queries';

function Author({ author, layout }) {
  const breadcrumbs = [
    { title: 'Home', path: '/' },
    { title: 'Authors', path: '/authors' },
    {
      title: author.name,
      path: `/authors/${author.slug}`,
      isCurrentPage: true
    }
  ];
  return (
    <Layout data={layout}>
      <Container maxW={'container.xl'} px={4} py={5}>
        <BreadCrumbs paths={breadcrumbs} />
        <VStack>
          {author?.pic && (
            <Box width={300}>
              <Image data={author.pic.responsiveImage} />
            </Box>
          )}
          <Text>{author?.name}</Text>
        </VStack>
      </Container>
    </Layout>
  );
}

export async function getStaticPaths() {
  const response = await doQuery(queries.authors, null);
  const items = response?.data?.authors || [];
  const paths = items.map((item) => ({
    params: { slug: item.slug }
  }));
  console.log('paths', paths);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const response = await doQuery(queries.author, { slug: params.slug });
  const author = response?.data?.author || null;

  const site = await doQuery(queries.siteQuery, null);
  const layout = getLayoutData(site, author?.seo);

  return { props: { author, layout } };
}

export default Author;
