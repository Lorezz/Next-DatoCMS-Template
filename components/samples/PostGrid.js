import {
  Box,
  SimpleGrid,
  Divider,
  Container,
  Wrap,
  Heading
} from '@chakra-ui/react';

import PostCard from 'components/samples/PostCard';

export default function SimpleThreeColumns() {
  return (
    <Container maxW={'6xl'} py={12}>
      <Heading as="h2" marginTop="5">
        Other posts
      </Heading>
      <Divider marginTop="5" />
      <Wrap spacing="30px" marginTop="5">
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <PostCard />
          <PostCard />
          <PostCard />
        </SimpleGrid>
      </Wrap>
    </Container>
  );
}
