require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
// For the default version
const moment = require('moment');
const _ = require('lodash');
const axios = require('axios');
const algoliasearch = require('algoliasearch');
const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.ALGOLIA_SECRET
);
const KEY = process.env.NEXT_PUBLIC_DATO_KEY;
/**
 * Function to retrieve data from DatoCMS
 * @param {String} q  - Graphql query
 * @param {Object} v  - optional variables for the query
 */
const doQuery = async (q, v) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${KEY}`
    };
    const data = {
      query: q,
      variables: v
    };
    const response = await axios.post('https://graphql.datocms.com', data, {
      headers
    });
    console.log('STATUS', response?.status);
    return response?.data;
  } catch (error) {
    console.error('QUERY ERROR', error);
    throw error;
  }
};

/**
 * Function to create or update an Index with data on Algolia
 * @param {String} indexName - The name of the index
 * @param {Object} settings - settings regarding searching the index
 * @param {Array} data - the array of porperties to upload on the index
 * @param {Boolean} replace - whether to replace or create the current index data
 */
const createObjects = async (indexName, settings, data, replace = false) => {
  //You don’t need to explicitly create an index, Algolia creates it automatically the first time you add an object.
  console.log(indexName, replace);
  const index = client.initIndex(indexName);
  await index.setSettings(settings);
  let results = null;
  if (replace) {
    results = await index.replaceAllObjects(data);
  } else {
    results = await index.saveObjects(data);
  }
  console.log(indexName, results);
  return results;
};

/**
 * Sample Function to create o indeex and data on Algolia
 */
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

/**
 * Perform a query to search on an index
 * @param {string} indexName - Name of index
 * @param {string} query - text to match properties
 */
const searchIndex = async (indexName, query) => {
  const index = client.initIndex(indexName);
  const results = await index.search(query);
  console.log(results?.hits);
  return results?.hits;
};

/**
 * Check if and object id exists on an index
 * @param {string} indexName - Name of index
 * @param {string} objectID - The id of a record you want to check
 */
const checkIfExists = async (indexName, objectID) => {
  const index = client.initIndex(indexName);
  // get a single object
  const result = await index.getObject(objectID);
  console.log(result);
  return result;
};

/**
 * List all current index
 */
const listIndexes = async () => {
  const list = await client.listIndices();
  return list?.items?.map((i) => i.name);
};

const query = `
query algolia {
  allTags {
    objectID: id
    name
    slug
    bgColor {
      hex
    }
    color {
      hex
    }
  }
  allAuthors {
    objectID: id
    name
    nick
    slug
    tags {
      slug
      name
    }
    pic {
      url(imgixParams: {w: "250", h: "250", fit: crop, auto: format})
    }
  }
  allPosts {
    objectID: id
    title
    slug
    publishDate: _firstPublishedAt
    tags {
      slug
      name
    }
    author {
      slug
      name
      nick
    }
    pic {
      url(imgixParams: {w: "250", h: "250", fit: crop, auto: format})
    }
  }
}
`;

/**
 * Format the data before to send to algolia
 */
const formatData = (data) => {
  const tagsData = data.allTags.map((obj) => {
    const authors = data.allAuthors.reduce((filtered, a) => {
      if (a?.tags?.find((t) => t.slug === obj.slug)) {
        filtered.push(_.omit(a, ['objectID', 'tags']));
      }
      return filtered;
    }, []);
    const posts = data.allPosts.reduce((filtered, a) => {
      if (a?.tags?.find((t) => t.slug === obj.slug)) {
        filtered.push(_.omit(a, ['objectID', 'tags']));
      }
      return filtered;
    }, []);

    return {
      ...obj,
      authors,
      authorsNumber: authors.length,
      posts,
      postsNumber: posts.length
    };
  });

  const authorsData = data.allAuthors.map((obj) => {
    const posts = data.allPosts.reduce((filtered, p) => {
      if (p?.author?.slug === obj.slug) {
        filtered.push(_.omit(p, ['objectID', 'tags', 'pic']));
      }
      return filtered;
    }, []);

    const aYearAgo = moment().add(-1, 'years');
    const lastPublication = posts.reduce((last, p) => {
      if (p?.publishDate) {
        const pubDate = moment(p.publishDate);
        last = pubDate.isAfter(last) ? pubDate : last;
      }
      return last;
    }, aYearAgo);

    let daysFromLastPublication = null;
    if (lastPublication) {
      daysFromLastPublication = moment().diff(lastPublication, 'days');
    }
    return {
      ...obj,
      posts,
      postsNumber: posts.length,
      daysFromLastPublication
    };
  });

  const postsData = data.allPosts.map((obj) => {
    const pubDate = moment(obj.publishDate);
    const daysFromPublication = moment().diff(pubDate, 'days');
    return {
      ...obj,
      daysFromPublication
    };
  });

  const payload = { tags: tagsData, posts: postsData, authors: authorsData };
  // fs.writeFileSync('./sample.json', JSON.stringify(payload));
  return payload;
};

const indexes = [
  {
    name: 'dev_samples_tags',
    customRanking: ['desc(postsNumber)', 'desc(authorsNumber)'],
    searchableAttributes: ['name,slug'],
    collection: 'tags'
  },
  {
    name: 'dev_samples_authors',
    customRanking: ['desc(postsNumber)', 'desc(daysFromLastPublication)'],
    searchableAttributes: ['name,nick,slug', 'tags.name'],
    collection: 'authors'
  },
  {
    name: 'dev_samples_posts',
    customRanking: ['desc(daysFromPublication)'],
    searchableAttributes: [
      'title,slug',
      'authors.name,authors.slug',
      'tags.name'
    ],
    collection: 'posts'
  }
];

(async () => {
  const label = 'INDEXING';
  console.time(label);
  try {
    //GET DATA
    const response = await doQuery(query);
    const formattedData = formatData(response?.data);
    console.timeLog(label);

    //GET EXISTING INDEXES
    const existingIndexList = await listIndexes();
    console.log(existingIndexList);
    console.timeLog(label);

    //UPDATE/CREATE INDEXES
    const promises = indexes.map(
      ({ name, customRanking, searchableAttributes, collection }) => {
        const data = formattedData[collection];
        const settings = {
          customRanking,
          searchableAttributes
        };
        const replace = existingIndexList.includes(name);
        return createObjects(name, settings, data, replace);
      }
    );
    await Promise.all(promises);

    //SAMPLE INDEX CREATION
    // await createPeopleIndex();
  } catch (e) {
    console.error(e);
  } finally {
    console.timeEnd(label);
  }
  console.log('END');
})();
