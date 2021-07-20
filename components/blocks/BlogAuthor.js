import NextLink from 'next/link';
import { Image, Text, HStack, Link, useColorModeValue } from '@chakra-ui/react';
import moment from 'moment';

const BlogAuthor = ({ author, date }) => {
  const publishDate = moment(date).format('ll');
  return (
    <NextLink href={`/authors/${author.slug}`} passHref={true}>
      <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
        <HStack
          p={3}
          marginTop={3}
          spacing={2}
          display="flex"
          cursor="pointer"
          rounded="md"
          _hover={{
            bg: useColorModeValue('gray.100', 'gray.900')
          }}>
          <Image
            borderRadius="full"
            boxSize="40px"
            src={author.pic.url}
            alt={`Avatar of ${author.name}`}
          />
          <Text fontWeight="medium">{author.name}</Text>
          <Text>{` - `}</Text>
          <Text>{publishDate}</Text>
        </HStack>
      </Link>
    </NextLink>
  );
};

export default BlogAuthor;
