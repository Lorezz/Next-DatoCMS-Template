import {
  SimpleGrid,
  Divider,
  Container,
  Wrap,
  Heading
} from '@chakra-ui/react';

import ProfileCard from 'components/cards/ProfileCard';

function TeamBlock({ title, people }) {
  return (
    <Container maxW={'6xl'} py={12}>
      <Heading as="h2" marginTop="5">
        {title}
      </Heading>
      <Divider marginTop="5" />
      <Wrap spacing="10px" marginTop="5">
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {people.map((p) => {
            return <ProfileCard key={p.id} {...p} />;
          })}
        </SimpleGrid>
      </Wrap>
    </Container>
  );
}
export default TeamBlock;
