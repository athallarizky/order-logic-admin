export default async function post(url, args, method = 'POST') {
  console.log('method', method);
  const res = await fetch(url, {
    method,
    body: JSON.stringify(args),
  });
  const { data } = await res.json();
  return data;
}
