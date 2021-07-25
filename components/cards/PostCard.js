import NextLink from 'next/link';

import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  Badge,
  Link,
  useColorModeValue
} from '@chakra-ui/react';
import { Image as DatoImage } from 'react-datocms';
import { render as toPlainText } from 'datocms-structured-text-to-plain-text';
import moment from 'moment';

function PostCard({ post }) {
  const {
    slug,
    preview,
    title,
    excerpt,
    author,
    tags,
    _firstPublishedAt: pub = Date.now()
  } = post;

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
          <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
            <Box
              cursor="pointer"
              h={210}
              bg={'gray.100'}
              mt={-6}
              mx={-6}
              mb={6}
              pos={'relative'}
              overflow={'hidden'}>
              {/* {pic && <Image src={pic?.url} />} */}
              {preview && <DatoImage data={preview?.responsiveImage} />}
            </Box>
          </Link>
        </NextLink>
        <Stack>
          <Stack direction={'row'}>
            {tags.map((tag) => {
              return (
                <NextLink
                  href={`/tags/${tag.slug}`}
                  key={tag.id}
                  passHref={true}>
                  <Link
                    textDecoration="none"
                    _hover={{ textDecoration: 'none' }}>
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
                  </Link>
                </NextLink>
              );
            })}
          </Stack>
          <NextLink href={`/blog/${slug}`} passHref={true}>
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              <Heading
                cursor="pointer"
                color={useColorModeValue('gray.700', 'white')}
                fontSize={'2xl'}
                fontFamily={'body'}
                mb={2}>
                {title}
              </Heading>
              <Text color={'gray.500'} noOfLines={5} cursor="pointer">
                {toPlainText(excerpt)}
              </Text>
            </Link>
          </NextLink>
        </Stack>
        <NextLink href={`/authors/${author?.slug}`}>
          <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
            <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
              <Avatar src={author?.pic?.url} alt={author?.name} />

              <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                <Text fontWeight={600}>{author?.name}</Text>
                <Text color={'gray.500'}>{date}</Text>
              </Stack>
            </Stack>
          </Link>
        </NextLink>
      </Box>
    </Center>
  );
}

export default PostCard;
