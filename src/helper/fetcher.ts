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
