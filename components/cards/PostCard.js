import NextLink from 'next/link';

import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  Badge,
  Image,
  useColorModeValue
} from '@chakra-ui/react';
import { StructuredText } from 'react-datocms';
import moment from 'moment';

function PostCard({ post }) {
  const { slug, pic, title, excerpt, author, tags, pub = Date.now() } = post;

  const colors = {
    light: 'purple.400',
    light_hover: 'purple.500',
    dark: 'green.300',
    dark_hover: 'green.400'
  };
  const color = useColorModeValue(colors.light, colors.dark);
  const colorHover = useColorModeValue(colors.light_hover, colors.dark_hover);

  const date = moment(pub).format('ll');
  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'lg'}
        p={6}
        overflow={'hidden'}>
        <NextLink href={`/blog/${slug}`}>
          <Box
            cursor="pointer"
            h={210}
            bg={'gray.100'}
            mt={-6}
            mx={-6}
            mb={6}
            pos={'relative'}
            overflow={'hidden'}>
            {pic && <Image src={pic?.url} />}
          </Box>
        </NextLink>
        <Stack>
          <Stack direction={'row'}>
            {tags.map((tag) => {
              return (
                <NextLink href={`/tags/${tag.slug}`} key={tag.id}>
                  <Badge
                    cursor="pointer"
                    px={2}
                    py={1}
                    bg={useColorModeValue('gray.50', 'gray.800')}
                    _hover={{
                      bg: tag.bgColor?.hex ?? colorHover,
                      color: tag.color?.hex ?? color
                    }}
                    textTransform={'uppercase'}
                    fontWeight={'400'}>
                    {`#${tag.name}`}
                  </Badge>
                </NextLink>
              );
            })}
          </Stack>
          <NextLink href={`/blog/${slug}`}>
            <Heading
              cursor="pointer"
              color={useColorModeValue('gray.700', 'white')}
              fontSize={'2xl'}
              fontFamily={'body'}>
              {title}
            </Heading>
          </NextLink>
          <NextLink href={`/blog/${slug}`}>
            <Text color={'gray.500'} noOfLines={5} cursor="pointer">
              <StructuredText data={excerpt} />
            </Text>
          </NextLink>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <NextLink href={`/authors/${author?.slug}`}>
            <Avatar src={author?.pic?.url} alt={author?.name} />
          </NextLink>
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <NextLink href={`/authors/${author?.slug}`}>
              <Text fontWeight={600}>{author?.name}</Text>
            </NextLink>
            <Text color={'gray.500'}>{date}</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}

export default PostCard;
