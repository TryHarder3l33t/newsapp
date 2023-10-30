export const axiosconfig = {
  BASEURL: process.env.BASEURL || 'http://localhost:8080/api',
  HEADERS: process.env.HEADERS || {
    'Content-Type': 'application/json',
  },
  TIMEOUT: process.env.TIMEOUT || 1000,
};
