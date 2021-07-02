import { Box, Text } from '@chakra-ui/react';

const LinkBlock = ({ node, children }) => {
  return (
    <Box borderLeftWidth={4} borderLeftColor="black">
      <Box px={5}>
        <Text as="i" fontWeight="light">
          {children}
        </Text>
      </Box>
      {node.attribution && (
        <Box px={5}>
          <Text fontWeight="bold">{`- ${node.attribution}`}</Text>
        </Box>
      )}
    </Box>
  );
};

export default LinkBlock;
