import md5 from 'md5';

export const getGravatarUrl = (email) => {
  const hash = md5(email);
  const picUrl = `https://www.gravatar.com/avatar/${hash}?s=80&d=retro`;
  return picUrl;
};
