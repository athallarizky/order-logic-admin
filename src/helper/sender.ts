// import axios from 'configs/axiosConfig';

export default async function postData(url, data?, token?, method = 'POST') {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();
  return responseData;
  // const headers = {
  //   withCredentials: true,
  //   headers: { Authorization: token },
  // };
  // console.log('response', headers);

  // const response = await axios.post(url, data, headers);

  // console.log('token', token);
  // const options = {
  //   method,
  //   url,
  //   data,
  //   headers: {
  //     Authorization: token,
  //   },
  //   withCredential: true,
  // };
  // const response = await axios(options);
  // return response.data;
}
