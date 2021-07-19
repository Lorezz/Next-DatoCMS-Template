import {
  Box,
  SimpleGrid,
  Divider,
  Container,
  Wrap,
  Heading
} from '@chakra-ui/react';

import ProfileCard from 'components/samples/ProfileCard';

export default function SimpleThreeColumns() {
  return (
    <Container maxW={'6xl'} py={12}>
      <Heading as="h2" marginTop="5">
        Our Team.
      </Heading>
      <Divider marginTop="5" />
      <Wrap spacing="10px" marginTop="5">
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
        </SimpleGrid>
      </Wrap>
    </Container>
  );
}
