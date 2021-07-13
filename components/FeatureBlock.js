import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  Heading
} from '@chakra-ui/react';
import { FcAssistant, FcDonate, FcInTransit, FcOk } from 'react-icons/fc';

const Feature = ({ title, text, icon }) => {
  const resolveIconByName = (name) => {
    let icon = null;
    switch (name) {
      case 'FcAssistant':
        icon = <Icon as={FcAssistant} w={10} h={10} />;
        break;
      case 'FcDonate':
        icon = <Icon as={FcDonate} w={10} h={10} />;
        break;
      case 'FcInTransit':
        icon = <Icon as={FcInTransit} w={10} h={10} />;
        break;
      default:
        icon = <Icon as={FcOk} w={10} h={10} />;
        break;
    }
    return icon;
  };

  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}>
        {icon ? resolveIconByName(icon) : null}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

function FeatureBlock({ title, features }) {
  return (
    <Box p={4}>
      {title && <Heading py={5}>{title}</Heading>}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {features.map(({ id, title, text, icon = null }) => {
          return <Feature key={id} icon={icon} title={title} text={text} />;
        })}
      </SimpleGrid>
    </Box>
  );
}

export default FeatureBlock;
