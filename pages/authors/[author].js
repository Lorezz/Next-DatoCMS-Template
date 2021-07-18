import {
  Box,
  Text,
  Container,
  VStack,
  Avatar,
  Heading,
  useColorModeValue
} from '@chakra-ui/react';

import Layout from 'components/layout/Layout';
import BreadCrumbs from 'components/layout/BreadCrumbs';
import LinkBlock from 'components/blocks/LinkBlock';
import TagBadge from 'components/blocks/TagBadge';
import BlockQuote from 'components/blocks/BlockQuote';

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

  const { nick, role, name, pic, tags, links, motto, bio } = author;
  return (
    <Layout data={layout}>
      <Container maxW={'container.xl'} px={4} py={5}>
        <BreadCrumbs paths={breadcrumbs} />
        <VStack>
          <Box mb={10} d="flex" flexDirection="column" alignItems="center">
            {pic && (
              <Box boxSize={600}>
                <Avatar mb={10} size="full" src={pic.url} />
              </Box>
            )}
            <Heading fontSize={'4xl'} as="h1" mb={5}>
              {name}
            </Heading>
            <Text
              fontSize="sm"
              color={useColorModeValue('gray.900', 'gray.100')}>
              {nick ? 'AKA ' + nick : ''}
            </Text>
            <Text fontWeight={600} color={'gray.500'} mb={4}>
              {role ? role : ''}
            </Text>
            <Box>
              {tags.map((t) => (
                <TagBadge size={'xl'} {...t} key={t.id} />
              ))}
            </Box>
          </Box>
        </VStack>
        <Box py={10}>
          <BlockQuote node={{ attribution: name }}>{motto}</BlockQuote>
        </Box>
        <Box py={10}>
          <Heading fontSize={'xl'} as="h3" my={5}>
            Bio
          </Heading>
          <Text dangerouslySetInnerHTML={{ __html: bio }} />
        </Box>

        <Box py={10}>
          <Heading fontSize={'xl'} as="h3" my={5}>
            Links
          </Heading>
          {links.map((l) => (
            <Box key={l.id}>
              <LinkBlock block={l} />
            </Box>
          ))}
        </Box>
      </Container>
    </Layout>
  );
}

export async function getStaticPaths() {
  const response = await doQuery(queries.authors, null);
  const items = response?.data?.authors || [];
  const paths = items.map((item) => ({
    params: { author: item.slug }
  }));
  console.log('paths', paths);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const response = await doQuery(queries.author, { slug: params.author });
  const author = response?.data?.author || null;

  const site = await doQuery(queries.siteQuery, null);
  const layout = getLayoutData(site, author?.seo);

  return { props: { author, layout } };
}

export default Author;
