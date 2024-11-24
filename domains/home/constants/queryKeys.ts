export const homeQueryKeys = {
  all: ['HOME'],
  getBannerList: (options?: object) => [
    ...homeQueryKeys.all,
    'BANNER_LIST',
    { options }
  ],
  getOngoingEventList: (options?: object) => [
    ...homeQueryKeys.all,
    'ONGOING_EVENT_LIST',
    { options }
  ],
  getUpcomingEventList: (options?: object) => [
    ...homeQueryKeys.all,
    'UPCOMING_EVENT_LIST',
    { options }
  ]
};
