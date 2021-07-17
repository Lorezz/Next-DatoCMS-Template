import { Input, Stack, Text } from '@chakra-ui/react';
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

function Hits({ searchState, searchResults }) {
  const validQuery = searchState.query?.length >= 3;

  return (
    <>
      {searchResults?.hits.length === 0 && validQuery && (
        <p>Aw snap! No search results were found.</p>
      )}
      {searchResults?.hits.length > 0 && validQuery && (
        <ol>
          {searchResults.hits.map((hit) => (
            <li key={hit.objectID}>{hit.name}</li>
          ))}
        </ol>
      )}
    </>
  );
}
const ConnectedHits = connectStateResults(Hits);

const Search = ({ indexName }) => (
  <InstantSearch searchClient={searchClient} indexName={indexName}>
    <ConnectedSearchBox />
    <ConnectedHits />
  </InstantSearch>
);

export default Search;
