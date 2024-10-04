export const eventListQueryKeys = {
  all: ['EVENT_LIST'],
  getEventList: (options?: object) => [...eventListQueryKeys.all, { options }],
  getNearEventList: (options?: object) => [
    ...eventListQueryKeys.all,
    'NEAR_EVENT_LIST',
    { options }
  ]
};
