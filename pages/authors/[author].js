import * as queries from 'lib/queries';
import { doQuery } from 'lib/api';
import { Box, Text, Container, VStack } from '@chakra-ui/react';
import { Image } from 'react-datocms';

import Layout from 'components/template/Layout';

function Post({ author }) {
  return (
    <Layout>
      <Container maxW={'container.xl'} px={4} py={5}>
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
  const data = response.data.allAuthors;
  console.log('DATA', data);

  const paths = data.map((item) => ({
    params: { author: item.slug }
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { author } = params;
  console.log('author', author);
  const response = await doQuery(queries.author, { slug: author });
  console.log('RESPONSE', response);

  // Pass post data to the page via props
  return { props: { author: response?.data?.author } };
}

export default Post;
