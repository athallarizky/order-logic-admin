import axios from 'axios';

axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;
axios.interceptors.request.use(data => {
  data.headers = {
    // 'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': '*',
    // 'Access-Control-Allow-Headers': '*',
    'Content-Type': 'application/json',
  };
  return data;
});

export default axios;
