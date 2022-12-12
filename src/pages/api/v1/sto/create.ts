import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';
import apiHandler from '@/helper/api/api';

export default apiHandler(handler);

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ status: 405, message: 'Method not allowed' });

  const parsedData = JSON.parse(req.body);
  const { sto_name } = parsedData.data;
  if (!sto_name) {
    return res.status(400).json({ status: 400, message: 'sto_name required' });
  }

  await dbConfig('sto_table').insert({
    sto_name,
  });
  return res.status(200).json({
    status: 200,
    message: 'created successfully',
  });
}
