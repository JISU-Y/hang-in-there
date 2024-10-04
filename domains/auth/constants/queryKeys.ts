export const authQueryKeys = {
  all: ['AUTH'],
  getUserProfile: (options?: object) => [
    ...authQueryKeys.all,
    'USER_PROFILE',
    { options }
  ],
  unlinkUser: (options?: object) => [
    ...authQueryKeys.all,
    'USER_UNLINK',
    { options }
  ]
};
