import Link from 'next/link';
import { Box, Heading, Container, SimpleGrid } from '@chakra-ui/react';

import Layout from 'components/Layout';
import BreadCrumbs from 'components/BreadCrumbs';
import HeroImage from 'components/HeroImage';
import StructuredContent from 'components/StructuredContent';
import TagBadge from 'components/TagBadge';

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
      {page?.slideshow?.slides && <Slideshow slides={page.slideshow.slides} />}
      {page?.pic && <HeroImage pic={page.pic} small={true} />}
      <Container maxW={'container.xl'} px={4} py={5} justify="flex-start">
        <BreadCrumbs paths={breadcrumbs} />
        <Heading as="h1" fontSize="6xl" py={10}>
          {page?.title}
        </Heading>
        {page?.content && <StructuredContent content={page.content} />}

        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 3 }}
          spacing="8"
          p="10"
          rounded="lg">
          {tags?.map((tag) => {
            return (
              <Box key={tag.id}>
                <Link href={`/tags/${tag.slug}`}>
                  <Box pointer="cursor">
                    <TagBadge {...tag} size="3xl" noDefault={true} />
                  </Box>
                </Link>
              </Box>
            );
          })}
        </SimpleGrid>
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
