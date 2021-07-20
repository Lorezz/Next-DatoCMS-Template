import useSWR from 'swr';
import { doQuery } from 'lib/api';
import {filterPosts} from 'lib/queries';

export function usePromotedPosts(limit=1) {
  const { data, error, mutate } = useSWR(`/promoted-posts`, () =>
    doQuery(filterPosts, { limit ,isFeatured:true})
  );
  console.log('data', data);
  return {
    loading: !error && !data,
    data,
    error,
    mutate
  };
}

export function useLastBlogPosts(limit=3) {
  const { data, error } = useSWR(`/recent-posts`, () =>
    doQuery(filterPosts, { limit , isFeatured:false})
  );
  console.log('data', data);
  return {
    loading: !error && !data,
    data,
    error
  };
}
