export const myPageQueryKeys = {
  all: ['MY_PAGE'],
  getOngoingEventList: (options?: object) => [
    ...myPageQueryKeys.all,
    'ONGOING_EVENT_LIST',
    { options }
  ],
  getUpcomingEventList: (options?: object) => [
    ...myPageQueryKeys.all,
    'UPCOMING_EVENT_LIST',
    { options }
  ]
};
