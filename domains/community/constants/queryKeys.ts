export const communityQueryKeys = {
  all: ['COMMUNITY'] as const,
  posts: (options?: object) => [
    ...communityQueryKeys.all,
    'POSTS',
    { options }
  ],
  postDetail: (options?: object) => [
    ...communityQueryKeys.all,
    'POST_DETAIL',
    { options }
  ],
  postTags: (options?: object) => [
    ...communityQueryKeys.all,
    'POST_TAGS',
    { options }
  ]
};
