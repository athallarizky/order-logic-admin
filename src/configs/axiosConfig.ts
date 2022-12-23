/* eslint-disable no-param-reassign */
import axios from 'axios';

// axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}`;
axios.create({
  withCredentials: true,
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});
axios.interceptors.request.use(data => {
  data.headers = {
    'Content-Type': 'application/json',
  };
  return data;
});

export default axios;
