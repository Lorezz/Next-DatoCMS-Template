import Link from 'next/link';
import { Box, Heading, Container, Wrap, WrapItem } from '@chakra-ui/react';

import Layout from 'components/layout/Layout';
import BreadCrumbs from 'components/layout/BreadCrumbs';
import Hero from 'components/heros/Hero';
import StructuredContent from 'components/StructuredContent';
import TagBadge from 'components/blocks/TagBadge';
import SearchAlgolia from 'components/SearchAlgolia';

import { doQuery } from 'lib/api';
import * as queries from 'lib/queries';
import { getLayoutData } from 'lib/utils';

const BlogIndexPage = ({ tags, page, layout }) => {
  const breadcrumbs = [
    { title: 'Home', path: '/' },
    { title: 'Tags', path: `/tags`, isCurrentPage: true }
  ];
  return (
    <Layout data={layout}>
      <Hero pic={page?.pic} picSize={'small'} slideshow={page?.slideshow} />
      <Container maxW={'container.xl'} px={4} py={5} justify="flex-start">
        <BreadCrumbs paths={breadcrumbs} />
        <Heading as="h1" fontSize="6xl" py={10}>
          {page?.title}
        </Heading>

        <SearchAlgolia indexName={'dev_samples_tags'} type="tags" />

        {page?.content && <StructuredContent content={page.content} />}
        <Wrap w="full" py={10} mb={20}>
          {tags?.map((tag) => {
            return (
              <WrapItem key={tag.id}>
                <Link href={`/tags/${tag.slug}`}>
                  <Box pointer="cursor">
                    <TagBadge {...tag} size="3xl" noDefault={true} />
                  </Box>
                </Link>
              </WrapItem>
            );
          })}
        </Wrap>
      </Container>
    </Layout>
  );
};

export async function getStaticProps() {
  const response = await doQuery(queries.tagList, null);
  const tags = response?.data?.tags || [];

  const slug = 'tags';
  const pageResponse = await doQuery(queries.page, { slug });
  const page = pageResponse?.data?.page || null;

  const site = await doQuery(queries.siteQuery, null);
  const layout = getLayoutData(site, page?.seo);

  return {
    props: { tags, page, layout }
  };
}

export default BlogIndexPage;
