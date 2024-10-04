export const eventDetailQueryKeys = {
  all: ['EVENT_DETAIL'],
  getEventDetail: (options?: object) => [
    ...eventDetailQueryKeys.all,
    { options }
  ],
  getOngoingEventList: (options?: object) => [
    ...eventDetailQueryKeys.all,
    'ONGOING_EVENT_LIST',
    { options }
  ]
};
