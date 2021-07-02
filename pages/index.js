import React from 'react';
import { Heading, Container } from '@chakra-ui/react';

import SEO from 'components/SEO';
import Layout from 'components/template/Layout';
import Slideshow from 'components/Slideshow';
import StructuredContent from 'components/StructuredContent';

// import { getMenuPaths, filterMenu } from 'utils/utils';
import * as queries from 'lib/queries';
import { doQuery } from 'lib/api';

const BlogIndexPage = ({ data }) => {
  return (
    <Layout>
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

export async function getStaticProps({ params }) {
  // console.log('CURRENT PARAMS', params);
  console.log(queries.home);
  const response = await doQuery(queries.home, null);
  const { data } = response;
  // const paths = getMenuPaths(data);

  // let v = { locale };
  // let payload = { ...params };
  // const r = await doQuery(queries.homeQuery, v);
  // payload.data = r.data;

  // const site = await doQuery(queries.siteQuery);
  // const footer = await doQuery(queries.footerQuery, { locale });
  // const navPages = filterMenu(paths, locale);

  // return {
  //   props: { site, footer, ...payload, paths, navPages, locale }
  // };

  return {
    props: { data }
  };
}

export default BlogIndexPage;
