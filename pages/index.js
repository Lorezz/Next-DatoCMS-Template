import React from 'react';
import { Heading, Container } from '@chakra-ui/react';

import SEO from 'components/SEO';
import Layout from 'components/Layout';
import Slideshow from 'components/Slideshow';
import StructuredContent from 'components/StructuredContent';

import * as queries from 'lib/queries';
import { doQuery } from 'lib/api';

const BlogIndexPage = ({ data, layout }) => {
  return (
    <Layout data={layout}>
      {data?.home?.seo && <SEO seo={data.home.seo} />}
      {data.home.slideshow?.slides && (
        <Slideshow slides={data.home.slideshow.slides} />
      )}
      <Container maxW={'container.xl'} px={4} py={5}>
        <Heading as="h1" fontSize="6xl" py={10}>
          {data.home.title}
        </Heading>
        {data?.home?.content && (
          <StructuredContent content={data.home.content} />
        )}
      </Container>
    </Layout>
  );
};

export async function getStaticProps() {
  // console.log(queries.home);
  const site = await doQuery(queries.siteQuery, null);
  const layout = site.data;

  const response = await doQuery(queries.home, null);
  const { data } = response;

  return {
    props: { data, layout }
  };
}

export default BlogIndexPage;
