import {
  SimpleGrid,
  Divider,
  Container,
  Wrap,
  Spinner
} from '@chakra-ui/react';

import PostCard from 'components/cards/PostCard';
import{ useLastBlogPosts} from "lib/apiHooks"

 function PostGrid({limit=3}) {
  const {loading,data}=useLastBlogPosts(limit)
  const posts = data?.data?.posts
  return (
    <Container maxW={'7xl'} pb={12}>
      <Divider marginTop="5" />
      <Wrap spacing="30px" marginTop="5">
        {loading && <Spinner/>}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {posts?.map(p=> <PostCard post={p} key={p.id}/>)}
        </SimpleGrid>
      </Wrap>
    </Container>
  );
}
export default PostGrid
