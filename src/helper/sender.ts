export default async function post(url, args) {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(args),
  });
  const { data } = await res.json();
  return data;
}
