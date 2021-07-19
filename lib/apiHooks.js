import useSWR from 'swr';
import { doQuery } from 'lib/api';
import * as queries from 'lib/queries';

export function usePromotedPost(limit) {
  const { data, error, mutate } = useSWR(`/promoted-posts`, () =>
    doQuery(queries.promotedPosts, { limit })
  );
  console.log('data', data);
  return {
    loading: !error && !data,
    data,
    error,
    mutate
  };
}

export function useLastBlogPost(limit) {
  const { data, error } = useSWR(`/recent-posts`, () =>
    doQuery(queries.recentPosts, { limit })
  );
  console.log('data', data);
  return {
    loading: !error && !data,
    data,
    error
  };
}
