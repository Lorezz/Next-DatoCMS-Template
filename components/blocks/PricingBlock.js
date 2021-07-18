import { Box, Stack, Heading, Text, VStack } from '@chakra-ui/react';

import PriceCard from 'components/cards/PriceCard';

function Pricing({ title, text, prices }) {
  return (
    <Box py={12}>
      <VStack spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          {title}
        </Heading>
        <Text fontSize="lg" color={'gray.500'}>
          {text}
        </Text>
      </VStack>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}>
        {prices.map((p) => (
          <PriceCard key={p.id} {...p} />
        ))}
      </Stack>
    </Box>
  );
}
export default Pricing;
