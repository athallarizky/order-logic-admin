/* eslint-disable max-len */
import axios from 'configs/axiosConfig';

export default async function fetcher(url, token) {
  // return axios({
  //   method: 'get',
  //   url: `${url}`,
  //   headers: { Authorization: `${token}` },
  // });

  return axios({
    method: 'get',
    url,
    headers: { Authorization: `${token}` },
  });

  // console.log('tokenxx', token);
  // const options = {
  //   headers: {
  //     Authorization: token,
  //   },
  // };
  // const response = await axios.get(url, options);
  // console.log('response', response);
  // return response;

  // if (error) console.log(error);
  // if (data) console.log(data);
}

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

// import unfetch from 'isomorphic-unfetch';

// /**
//  * Helper for fetch which automatically returns the JSON and works both on server and client-side.
//  *
//  * @param input URL path or a `Request` object.
//  * @param init Additional `fetch()` options
//  */
// export default async function fetcher<TResponse = unknown>(input: RequestInfo, init?: RequestInit): Promise<TResponse> {
//   const res = await unfetch(input, init);
//   if (!res.ok) {
//     const error = new Error('An error occurred while fetching the data.');
//     throw error;
//   }
//   const data: Promise<TResponse> = await res.json();
//   return data;
// }
