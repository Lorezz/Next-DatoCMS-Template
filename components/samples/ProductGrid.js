import {
  SimpleGrid,
  Divider,
  Container,
  Wrap,
  Heading
} from '@chakra-ui/react';

import ProductCard from 'components/samples/ProductCard';
import ProductCard2 from 'components/samples/ProductCard2';

export default function SimpleThreeColumns() {
  return (
    <Container maxW={'6xl'} py={12}>
      <Heading as="h2" marginTop="5">
        Just Added Products from the Store.
      </Heading>
      <Divider marginTop="5" />
      <Wrap spacing="10px" marginTop="5">
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard2 />
          <ProductCard2 />
          <ProductCard2 />
        </SimpleGrid>
      </Wrap>
    </Container>
  );
}
