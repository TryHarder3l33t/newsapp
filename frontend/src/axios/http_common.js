import axios from 'axios';
import {
  axiosHttpConfig as httpConfig,
  axiosImageConfig as imageConfig,
} from './axiosconfig';

export const http = axios.create({
  baseURL: httpConfig.BASEURL,
  headers: httpConfig.HEADERS,
  timeout: httpConfig.TIMEOUT,
});

export const httpImage = axios.create({
  baseURL: imageConfig.BASEURL,
  headers: imageConfig.HEADERS,
  timeout: imageConfig.TIMEOUT,
});
