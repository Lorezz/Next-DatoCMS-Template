import axios from 'axios';

// import * as qs from './queries';

const endpoint = process.env.NEXT_PUBLIC_SRV_URL;

export const call = async (q, v, bearer = null) => {
  let headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };
  if (bearer) {
    headers = { ...headers, Authorization: `Bearer ${bearer}` };
  }
  try {
    const response = await axios({
      url: endpoint,
      method: 'POST',
      headers,
      data: { query: q, variables: v }
    });
    // console.log('response', response);
    const { status } = response;
    console.log('STATUS', status);
    const { data } = response;
    console.log('DATA', data);

    return data;
  } catch (error) {
    console.log('API CALL ERROR', error);
    throw error && error.message
      ? error.message
      : error
      ? JSON.stringify(error)
      : 'ERROR CONTACTING SERVER';
  }
};
