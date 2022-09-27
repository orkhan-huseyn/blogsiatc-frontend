export function parseUserInfo(user) {
  const { fullName = '', image = '', oAuthProvider = '' } = user || {};
  let imageUrl = process.env.REACT_APP_BACKEND_URL + '/' + image;

  if (oAuthProvider) {
    imageUrl = image;
  }

  return {
    fullName,
    imageUrl,
  };
}
