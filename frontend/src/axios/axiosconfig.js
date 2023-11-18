// DB Server
export const axiosHttpConfig = {
  BASEURL: process.env.BASEURL || 'http://localhost:8080/api',
  HEADERS: process.env.HEADERS || {
    'Content-Type': 'application/json',
  },
  TIMEOUT: process.env.TIMEOUT || 5000,
};

// Image Server
export const axiosImageConfig = {
  BASEURL: process.env.BASEURL || 'http://localhost:8081/api',
  HEADERS: process.env.HEADERS || {
    'Content-Type': 'application/json',
  },
  TIMEOUT: process.env.TIMEOUT || 5000,
};
