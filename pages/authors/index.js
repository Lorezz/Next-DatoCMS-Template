import Link from 'next/link';
import {
  Box,
  Heading,
  Container,
  Text,
  SimpleGrid,
  Avatar
} from '@chakra-ui/react';
// import { Image } from 'react-datocms';

import Layout from 'components/template/Layout';
import { doQuery } from 'lib/api';
import * as queries from 'lib/queries';

const AuthorsIndexPage = ({ authors }) => {
  return (
    <Layout>
      <Container maxW={'container.xl'} px={4} py={5}>
        <Heading as="h1" fontSize="6xl" py={10}>
          {'BLOG INDEX'}
        </Heading>
        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 3 }}
          spacing="8"
          p="10"
          rounded="lg">
          {authors?.map((author) => {
            return (
              <Box key={author.id}>
                <Link href={`/authors/${author.slug}`}>
                  <a>
                    {author.pic.url && (
                      <Avatar name={author.name} src={author.pic.url} />
                    )}
                    <Text>{author.name}</Text>
                  </a>
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
  const response = await doQuery(queries.authors, null);
  const authors = response?.data?.authors || [];
  return {
    props: { authors }
  };
}

export default AuthorsIndexPage;
