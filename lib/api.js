import axios from 'axios';

import * as qs from './queries';

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

    if (data?.errors) {
      console.log('ERRORS', data?.errors[0].extensions);
      const err = data.errors[0];
      if (err.extensions.status === 401) {
        throw err.extensions.status;
      } else {
        // console.log('QUERY', q);
        console.log('VALUES', v);
        throw err.code || err.message || JSON.stringify(err);
      }
    }

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

export const signUp = (data) => call(qs.signUp, data);
export const signIn = (data) => call(qs.signIn, data);
export const signOut = (data, bearer) => call(qs.signOut, data, bearer);

export const forgetPwd = (data) => call(qs.forgetPwd, data);
export const resetPwd = (data, bearer) => call(qs.resetPwd, data, bearer);

export const follow = (data, bearer) => call(qs.follow, data, bearer);
export const unFollow = (data, bearer) => call(qs.unFollow, data, bearer);

export const getMyStuff = (bearer) => call(qs.mine, null, bearer);
export const getProfile = (data, bearer) => call(qs.profile, data, bearer);

export const getFlag = (data, bearer) => call(qs.getFlag, data, bearer);

export const createFlag = (data, bearer) => call(qs.createFlag, data, bearer);
export const updateFlag = (data, bearer) => call(qs.updateFlag, data, bearer);
export const destroyFlag = (data, bearer) => call(qs.destroyFlag, data, bearer);

export const getPlace = (data, bearer) => call(qs.getPlace, data, bearer);
export const getLocation = (data, bearer) => call(qs.getLocation, data, bearer);
export const getLocations = (data, bearer) => call(qs.locations, data, bearer);

export const addPost = (data, bearer) => call(qs.createPost, data, bearer);
export const updatePost = (data, bearer) => call(qs.updatePost, data, bearer);
export const destroyPost = (data, bearer) => call(qs.destroyPost, data, bearer);

export const getFlags = (bearer) => call(qs.flags, null, bearer);
export const getPosts = (bearer) => call(qs.posts, null, bearer);
export const getUsers = (bearer) => call(qs.users, null, bearer);
export const getReports = (bearer) => call(qs.reportings, null, bearer);

export const createReport = (data, bearer) =>
  call(qs.createReport, data, bearer);
export const removeUser = (data, bearer) => call(qs.removeUser, data, bearer);
export const removePost = (data, bearer) => call(qs.removePost, data, bearer);
export const closeReport = (data, bearer) => call(qs.closeReport, data, bearer);
