export const homeQueryKeys = {
  all: ['HOME'],
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
