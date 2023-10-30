/**
 * #3 call backend
 * Base URL is localhost/api so calls on the backend will be localhost/api/users
 */
import http from '../../axios/http_common.js';

export const readUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await http.get('/users');
      console.log(...data);
    } catch (error) {
      console.log('Axios readUsers Failed');
      console.log(error);
    }
  };
};
