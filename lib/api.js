const KEY = process.env.NEXT_PUBLIC_DATO_KEY;

export const doQuery = async (q, v) => {
  try {
    // console.log(q, v);
    return await fetch('https://graphql.datocms.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${KEY}`
      },
      body: JSON.stringify({ query: q, variables: v })
    }).then((res) => res.json());
  } catch (error) {
    console.log('QUERY ERROR', error, 'on query', q);
    throw error;
  }
};
