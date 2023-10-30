import axios from 'axios';
import { axiosconfig as config } from './axiosconfig';

export default axios.create({
  baseURL: config.BASEURL,
  headers: config.HEADERS,
  timeout: config.TIMEOUT,
});
