import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';
import apiHandler from '@/helper/api/api';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ status: 405, message: 'Method not allowed' });

  // const parsedData = JSON.parse(req.body);
  const { jenis_gangguan } = req.body.data;
  if (!jenis_gangguan) {
    return res.status(400).json({ status: 400, message: 'jenis_gangguan required' });
  }

  await dbConfig('jenis_gangguan_table').insert({
    jenis_gangguan,
  });
  return res.status(200).json({
    status: 200,
    message: 'created successfully',
  });
}

export default apiHandler(handler);
