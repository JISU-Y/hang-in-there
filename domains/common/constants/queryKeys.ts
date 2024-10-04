export const commonQueryKeys = {
  all: ['COMMON'],
  getPopularEventList: (options?: object) => [
    ...commonQueryKeys.all,
    'POPULAR_EVENT_LINT',
    { options }
  ],
  getSearchEventResult: (options?: object) => [
    ...commonQueryKeys.all,
    'SEARCH_EVENT_RESULT',
    { options }
  ]
};
