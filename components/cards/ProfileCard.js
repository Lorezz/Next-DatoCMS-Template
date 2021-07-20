import NextLink from 'next/link';
import {
  Box,
  Heading,
  Avatar,
  Text,
  Stack,
  Button,
  Badge,
  Center,
  Link,
  useColorModeValue
} from '@chakra-ui/react';

function ProfileCard({
  name,
  nick = '',
  motto = '',
  tags = [],
  role = '',
  slug,
  pic
}) {
  const colors = {
    light: 'purple.400',
    light_hover: 'purple.500',
    dark: 'green.300',
    dark_hover: 'green.400'
  };
  const color = useColorModeValue(colors.light, colors.dark);
  const colorHover = useColorModeValue(colors.light_hover, colors.dark_hover);
  return (
    <Center py={6}>
      <Box
        w={'full'}
        maxW={'320px'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        textAlign={'center'}>
        <Avatar
          size={'xl'}
          src={pic.url}
          alt={name}
          mb={4}
          pos={'relative'}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: 'green.300',
            border: '2px solid white',
            rounded: 'full',
            pos: 'absolute',
            bottom: 0,
            right: 3
          }}
        />
        <Heading fontSize={'2xl'} fontFamily={'body'}>
          {name}
        </Heading>
        <Text fontSize="sm" color={useColorModeValue('gray.900', 'gray.100')}>
          {nick ? 'AKA ' + nick : ''}
        </Text>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          {role ? role : ''}
        </Text>

        <Text
          textAlign={'center'}
          color={useColorModeValue('gray.700', 'gray.400')}
          px={3}>
          {motto}
        </Text>

        <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
          {tags.map((tag) => {
            const { slug, id, name, bgColor, color } = tag;
            return (
              <NextLink href={`/tags/${slug}`} key={id} passHref={true}>
                <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  <Badge
                    cursor="pointer"
                    px={2}
                    py={1}
                    bg={useColorModeValue('gray.50', 'gray.800')}
                    _hover={{
                      bg: bgColor?.hex ?? colorHover,
                      color: color?.hex ?? color
                    }}
                    fontWeight={'400'}>
                    {`#${name}`}
                  </Badge>
                </Link>
              </NextLink>
            );
          })}
        </Stack>

        <NextLink href={`/authors/${slug}`} passHref={true}>
          <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
            <Stack mt={8} direction={'row'} spacing={4}>
              <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                bg={color}
                color={'white'}
                boxShadow="lg"
                _hover={{
                  bg: colorHover
                }}
                _focus={{
                  bg: colorHover
                }}>
                View Profile
              </Button>
            </Stack>
          </Link>
        </NextLink>
      </Box>
    </Center>
  );
}

export default ProfileCard;
