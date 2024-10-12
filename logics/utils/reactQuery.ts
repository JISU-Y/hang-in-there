import { cache } from 'react';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  QueryState,
  QueryKey
} from '@tanstack/react-query';
import { isEqual } from 'lodash';

// NOTE: 서버에서 데이터를 fetching 할 때 마다 필요한 queryClient를 cache 해서 사용
export const getQueryClient = cache(() => new QueryClient());

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

interface QueryProps<ResponseType = unknown> {
  queryKey: QueryKey;

  queryFn: () => Promise<ResponseType>;
}

interface DehydratedQueryExtended<TData = unknown, TError = unknown> {
  state: QueryState<TData, TError>;
}

// NOTE: queryClient를 이용하여 서버에서 데이터를 prefetching 하고 dehydrate 한 특정 query 결과물을 리턴
export async function getDehydratedQuery<Q extends QueryProps>({
  queryKey,

  queryFn
}: Q) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({ queryKey, queryFn });

  const { queries } = dehydrate(queryClient);

  const [dehydratedQuery] = queries.filter(query =>
    isEqual(query.queryKey, queryKey)
  );

  return dehydratedQuery as DehydratedQueryExtended<
    UnwrapPromise<ReturnType<Q['queryFn']>>
  >;
}

// NOTE: queryClient를 이용하여 서버에서 데이터를 prefetching 하고 dehydrate 한 모든 query 결과물을 리턴 (query 순서는 보장되지 않음.)
export async function getDehydratedQueries<Q extends QueryProps[]>(queries: Q) {
  const queryClient = getQueryClient();

  await Promise.all(
    queries.map(({ queryKey, queryFn }) =>
      queryClient.prefetchQuery({ queryKey, queryFn })
    )
  );

  return dehydrate(queryClient).queries as DehydratedQueryExtended<
    UnwrapPromise<ReturnType<Q[number]['queryFn']>>
  >[];
}

export const Hydrate = HydrationBoundary;
