import {
  Box,
  HStack,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';

function PriceCard({
  id,
  period,
  title,
  isMostPopular,
  features,
  currency,
  amount,
  action
}) {
  const colors = { light: 'purple.300', dark: 'green.300' };
  const colorScheme = useColorModeValue('purple', 'green');
  return (
    <Box
      key={id}
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}>
      <Box position="relative">
        {isMostPopular && (
          <Box
            position="absolute"
            top="-16px"
            left="50%"
            style={{ transform: 'translate(-50%)' }}>
            <Text
              textTransform="uppercase"
              bg={useColorModeValue(colors.light, colors.dark)}
              px={3}
              py={1}
              color={'white'}
              fontSize="sm"
              fontWeight="600"
              rounded="xl">
              Most Popular
            </Text>
          </Box>
        )}
        <Box py={4} px={12}>
          <Text fontWeight="500" fontSize="2xl">
            {title}
          </Text>
          <HStack justifyContent="center">
            <Text fontSize="3xl" fontWeight="600">
              {currency}
            </Text>
            <Text fontSize="5xl" fontWeight="900">
              {amount}
            </Text>
            <Text fontSize="3xl" color="gray.500">
              {'/' + period}
            </Text>
          </HStack>
        </Box>
        <VStack
          bg={useColorModeValue('gray.50', 'gray.700')}
          py={4}
          borderBottomRadius={'xl'}>
          <List spacing={3} textAlign="start" px={12}>
            {features.map((feat, index) => {
              return (
                <ListItem key={index + '-' + feat}>
                  <ListIcon
                    as={FaCheckCircle}
                    color={useColorModeValue(colors.light, colors.dark)}
                  />
                  {feat}
                </ListItem>
              );
            })}
          </List>
          <Box w="80%" pt={7}>
            <Button w="full" colorScheme={colorScheme} variant="outline">
              {action}
            </Button>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}

export default PriceCard;
