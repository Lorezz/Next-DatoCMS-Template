import {
  Input,
  Stack,
  Text,
  VStack,
  Box,
  Image,
  Flex,
  Tag,
  Link,
  useColorModeValue
} from '@chakra-ui/react';
import NextLink from 'next/link';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  connectSearchBox,
  connectStateResults
} from 'react-instantsearch-dom';

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
);

function SearchBox({ refine }) {
  return (
    <form action="" role="search">
      <Stack spacing={3}>
        <Text htmlFor="algolia_search">Search articles</Text>
        <Input
          size="lg"
          id="algolia_search"
          type="search"
          placeholder="javascript tutorial"
          onChange={(e) => refine(e.currentTarget.value)}
        />
      </Stack>
    </form>
  );
}
const ConnectedSearchBox = connectSearchBox(SearchBox);

function Hits({ searchState, searchResults, type }) {
  const validQuery = searchState.query?.length >= 3;
  if (!validQuery) return null;
  const prefix = `/${type}`;
  return (
    <Box
      boxShadow="xs"
      borderWidth={1}
      borderColor="gray.100"
      p="6"
      rounded="md"
      bg={useColorModeValue('gray.100', 'gray.900')}>
      {searchResults?.hits.length === 0 && (
        <Text color="blue.400">Aw snap! No search results were found.</Text>
      )}

      {searchResults?.hits.length > 0 && (
        <VStack>
          {searchResults.hits.map((hit) => (
            <NextLink href={`${prefix}/${hit?.slug}`} passHref={true}>
              <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                <Flex
                  cursor="pointer"
                  key={hit.objectID}
                  my={5}
                  p={5}
                  rounded="md"
                  bg={useColorModeValue('white', 'gray.700')}>
                  {hit.pic && (
                    <Box boxSize={100}>
                      <Image src={hit?.pic?.url} />
                    </Box>
                  )}
                  <Box pl={hit.pic ? 5 : 0}>
                    <Text fontSize="lg" fontWeight="medium">
                      {type === 'tags' ? '# ' : ''}
                      {type === 'blog' ? hit.title : hit.name}
                    </Text>
                    {(hit.author || hit.tags) && (
                      <Box>
                        {hit.author && (
                          <Text fontSize="sm" p={1}>
                            By {hit.author?.name}
                          </Text>
                        )}
                        <Flex mt={2}>
                          {hit.tags?.map((t) => (
                            <Tag m={1} key={t.slug}>
                              {t.name}
                            </Tag>
                          ))}
                        </Flex>
                      </Box>
                    )}
                  </Box>
                </Flex>
              </Link>
            </NextLink>
          ))}
        </VStack>
      )}
    </Box>
  );
}
const ConnectedHits = connectStateResults(Hits);

const Search = ({ indexName, type }) => (
  <InstantSearch searchClient={searchClient} indexName={indexName}>
    <ConnectedSearchBox />
    <ConnectedHits type={type} />
  </InstantSearch>
);

export default Search;
