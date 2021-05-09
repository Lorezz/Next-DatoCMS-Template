import jwtDecode from 'jwt-decode';
import moment from 'moment';

export const checkIfExpired = (token) => {
  const decoded = jwtDecode(token);
  const { exp } = decoded;
  const fmt = 'YYYY-MM-DD HH:mm:ss';
  const expire = moment(exp * 1000).format(fmt);
  const now = moment().format(fmt);
  if (now > expire) {
    return true;
  }
  return false;
};
