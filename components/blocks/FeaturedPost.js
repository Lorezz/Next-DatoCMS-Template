import NextLink from 'next/link';
import {
  Box,
  Heading,
  Image,
  Text,
  HStack,
  Link,
  useColorModeValue,
  Container,
  Spinner
} from '@chakra-ui/react';
import { render as toPlainText } from 'datocms-structured-text-to-plain-text';

import TagBadge from 'components/blocks/TagBadge';
import BlogAuthor from 'components/blocks/BlogAuthor';
import { usePromotedPosts } from 'lib/apiHooks';

const BlogTags = ({ tags }) => {
  return (
    <HStack spacing={2}>
      {tags.map((tag) => {
        return <TagBadge {...tag} key={tag.id} noDefault />;
      })}
    </HStack>
  );
};

const PromotedPost = ({ post, direction }) => {
  if (!post) return null;
  return (
    <Box
      marginTop={{ base: '1', sm: '5' }}
      display="flex"
      flexDirection={{
        base: 'column',
        sm: direction
      }}
      justifyContent="space-between">
      <Box
        display="flex"
        flex="1"
        marginRight="3"
        position="relative"
        alignItems="center">
        <Box
          width={{ base: '100%', sm: '85%' }}
          zIndex="2"
          marginLeft={{ base: '0', sm: '5%' }}
          marginTop="5%">
          <NextLink href={`/blog/${post?.slug}`} passHref={true}>
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              <Image
                borderRadius="lg"
                src={post?.preview?.url}
                alt={post?.title}
                objectFit="contain"
              />
            </Link>
          </NextLink>
        </Box>
        <Box zIndex="1" width="100%" position="absolute" height="100%">
          <Box
            bgGradient={useColorModeValue(
              'radial(orange.600 1px, transparent 1px)',
              'radial(orange.300 1px, transparent 1px)'
            )}
            backgroundSize="20px 20px"
            opacity="0.4"
            height="100%"
          />
        </Box>
      </Box>
      <Box
        display="flex"
        flex="1"
        flexDirection="column"
        justifyContent="center"
        marginTop={{ base: '3', sm: '0' }}>
        {post?.tags && <BlogTags tags={post.tags} />}
        <Heading marginTop="1" cursor="pointer">
          <NextLink href={`/blog/${post.slug}`} passHref={true}>
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              {post?.title}
            </Link>
          </NextLink>
        </Heading>
        <NextLink href={`/blog/${post.slug}`} passHref={true}>
          <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
            <Text
              marginTop="2"
              color={useColorModeValue('gray.700', 'gray.500')}
              fontSize="lg"
              noOfLines={5}
              cursor="pointer">
              {toPlainText(post?.excerpt)}
            </Text>
          </Link>
        </NextLink>

        {post?.author && (
          <BlogAuthor author={post?.author} date={post?._firstPublishedAt} />
        )}
      </Box>
    </Box>
  );
};

const FeaturedPosts = ({ limit = 1 }) => {
  const { loading, data } = usePromotedPosts(limit);
  const posts = data?.data?.posts;
  return (
    <Container maxW={'7xl'} pb="12">
      {loading && <Spinner />}
      {posts?.map((p, i) => {
        console.log(p);
        return (
          <PromotedPost
            post={p}
            direction={i % 2 === 0 ? 'row' : 'row-reverse'}
            key={p.id}
          />
        );
      })}
    </Container>
  );
};

export default FeaturedPosts;
