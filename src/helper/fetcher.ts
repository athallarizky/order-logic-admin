/* eslint-disable max-len */
// import axios from 'axios';

// export default async function fetcher(url, token) {
//   console.log('token', token);
//   const { data } = await axios({
//     method: 'get',
//     url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/${url}`,
//     headers: { Authorization: `${token}` },
//     withCredentials: true,
//   });

//   return data;

//   // return axios({
//   //   method: 'get',
//   //   url,
//   //   headers: { Authorization: `${token}` },
//   //   withCredentials: true,
//   // });

//   // console.log('tokenxx', token);
//   // const options = {
//   //   headers: {
//   //     Authorization: token,
//   //   },
//   // };
//   // const response = await axios.get(url, options);
//   // console.log('response', response);
//   // return response;

//   // if (error) console.log(error);
//   // if (data) console.log(data);
// }

// export default async function getData(url, token, data?, method = 'GET') {
//   const options = {
//     method,
//     url,
//     data,
//     headers: {
//       Authorization: token,
//     },
//   };
//   const response = await axios(options);
//   return response.data;
// }

import unfetch from 'isomorphic-unfetch';

/**
 * Helper for fetch which automatically returns the JSON and works both on server and client-side.
 *
 * @param input URL path or a `Request` object.
 * @param init Additional `fetch()` options
 */
export default async function fetcher<TResponse = unknown>(input: RequestInfo, init?: RequestInit): Promise<TResponse> {
  const res = await unfetch(input, init);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    throw error;
  }
  const data: Promise<TResponse> = await res.json();
  return data;
}
