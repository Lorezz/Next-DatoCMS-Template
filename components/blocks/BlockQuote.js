import { Box, Text, useColorModeValue } from '@chakra-ui/react';

const LinkBlock = ({ node, children }) => {
  return (
    <Box
      my={5}
      borderLeftWidth={4}
      borderLeftColor={useColorModeValue('black', 'white')}>
      <Box px={5}>
        <Text as="i" fontWeight="light">
          {children}
        </Text>
      </Box>
      {node.attribution && (
        <Box px={5} py={3}>
          <Text fontWeight="bold">{`- ${node.attribution}`}</Text>
        </Box>
      )}
    </Box>
  );
};

export default LinkBlock;
