// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  loginPage: () => '/login',
  signUpPage: () => '/signup',
  mainPage: () => '/',
  loginPath: () => [host, prefix, 'login'].join('/'),
  signupPath: () => [host, prefix, 'signup'].join('/'),
  usersPath: () => [host, prefix, 'data'].join('/'),
  channelsPath: () => [host, prefix, 'channels'].join('/'),
  channelPath: (id) => [host, prefix, 'channels', id].join('/'),
  channelMessagesPath: (id) => [host, prefix, 'channels', id, 'messages'].join('/'),
};
