import React from 'react';
import { Heading, Container } from '@chakra-ui/react';

import Layout from 'components/Layout';
import Slideshow from 'components/Slideshow';
import StructuredContent from 'components/StructuredContent';

import * as queries from 'lib/queries';
import { doQuery } from 'lib/api';

const BlogIndexPage = ({ page, layout }) => {
  return (
    <Layout data={layout}>
      {page.slideshow?.slides && <Slideshow slides={page.slideshow.slides} />}
      <Container maxW={'container.xl'} px={4} py={5}>
        {/* <Heading as="h1" fontSize="6xl" py={10}>
          {page.title}
        </Heading> */}
        {page.content && <StructuredContent content={page.content} />}
      </Container>
    </Layout>
  );
};

export async function getStaticProps() {
  const response = await doQuery(queries.home, null);
  const page = response?.data?.home;

  const site = await doQuery(queries.siteQuery, null);
  const favicon = site?.data?.site?.favicon || [];
  const metatags = [...favicon, ...page.seo];
  const layout = { ...site.data, metatags };

  return {
    props: { page, layout }
  };
}

export default BlogIndexPage;
