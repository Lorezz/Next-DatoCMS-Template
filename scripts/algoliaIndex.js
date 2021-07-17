require('dotenv').config();
// For the default version
const algoliasearch = require('algoliasearch');
const client = algoliasearch(
  process.env.ALGOLIA_APPID,
  process.env.ALGOLIA_SECRET
);

console.log('KEY', process.env.ALGOLIA_APPID);

const createObjects = async (indexName, settings, data) => {
  //You don’t need to explicitly create an index, Algolia creates it automatically the first time you add an object.
  const index = client.initIndex(indexName);

  await index.setSettings(settings);
  // const results = await index.replaceAllObjects(data);
  const results = await index.saveObjects(data);
  return results;
};

const createPeopleIndex = async () => {
  const data = [
    {
      objectID: 'myID1',
      name: 'Jimmie',
      nick: 'Barninger',
      postsNumber: 3,
      slug: 'barninger',
      posts: [
        {
          id: 1,
          title: 'Grand Theft Auto V'
        }
      ],
      tags: ['scifi', 'book']
    },
    {
      objectID: 'myID2',
      name: 'Warren',
      nick: 'Speach',
      postsNumber: 1,
      slug: 'speach',
      posts: [
        {
          id: 2,
          title: 'Speachy'
        }
      ],
      tags: ['music', 'movie']
    }
  ];
  // `title` and `comments` have the same priority
  const indexName = 'dev_samples_authors';
  const customRanking = ['desc(postsNumber)'];
  const searchableAttributes = ['name,nick', 'tags'];
  const settings = {
    customRanking,
    searchableAttributes
  };
  await createObjects(indexName, settings, data);
};

const searchIndex = async (indexName, query) => {
  const index = client.initIndex(indexName);
  const results = await index.search(query);
  console.log(results?.hits);
};

const checkIfExists = async (indexName, objectID) => {
  const index = client.initIndex(indexName);
  // get a single object
  const result = await index.getObject(objectID);
  console.log(result);
};

const listIndexes = async () => {
  const list = await client.listIndices();
  console.log('INDEXES', list);
};

(async () => {
  console.log('START');
  try {
    // await createPeopleIndex();
    await listIndexes();
  } catch (e) {
    console.log('ERROR', e);
  }
  console.log('END');
})();
