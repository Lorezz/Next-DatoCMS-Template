import { Heading, Container } from '@chakra-ui/react';

import * as queries from 'lib/queries';
import { doQuery } from 'lib/api';
import { getLayoutData } from 'lib/utils';
import Layout from 'components/layout/Layout';
import StructuredContent from 'components/StructuredContent';
import ModularContent from 'components/ModularContent';
import BreadCrumbs from 'components/layout/BreadCrumbs';
import Hero from 'components/heros/Hero';

function Post({ page, layout }) {
  const breadcrumbs = [
    { title: 'Home', path: '/' },
    { title: page?.title, path: `/${page?.slug}`, isCurrentPage: true }
  ];
  return (
    <Layout data={layout}>
      <Hero pic={page?.pic} picSize={'small'} slideshow={page?.slideshow} />
      <Container maxW={'container.xl'} px={4} py={5}>
        <BreadCrumbs paths={breadcrumbs} />
        <Heading as="h1" fontSize="6xl" py={10}>
          {page?.title}
        </Heading>
        {page?.content && <StructuredContent content={page.content} />}
        {page?.modBlocks && <ModularContent content={page.modBlocks} />}
      </Container>
    </Layout>
  );
}

export async function getStaticPaths() {
  const response = await doQuery(queries.pages, null);
  const pages = response?.data?.pages || [];
  const paths = pages.map((page) => ({
    params: { slug: page.slug }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const response = await doQuery(queries.page, { slug });
  const page = response?.data?.page || null;

  // if (!page) {
  //   console.log('PAGE QUERY', queries.home);
  //   console.log('PAGE SLUG', slug);
  // }

  const siteResponse = await doQuery(queries.siteQuery, null);
  const layout = getLayoutData(siteResponse, page?.seo);

  // Pass post data to the page via props
  return { props: { page, layout } };
}

export default Post;
