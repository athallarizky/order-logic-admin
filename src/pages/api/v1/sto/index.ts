// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';
import apiHandler from '@/helper/api/api';

export default apiHandler(handler);

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ status: 405, message: 'Method not allowed' });
  const data = await dbConfig('sto_table');
  return res.status(200).json({
    status: 200,
    data,
  });
}
