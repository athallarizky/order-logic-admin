import axios from 'configs/axiosConfig';

export default async function postData(url, data, method = 'POST') {
  const options = {
    method,
    url,
    data,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  };
  const response = await axios(options);
  return response.data;
}
