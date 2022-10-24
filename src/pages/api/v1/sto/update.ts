import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') return res.status(405).json({ status: 405, message: 'Method not allowed' });

  const { id, sto_name } = req.body;
  if (!id && !sto_name) {
    return res.status(400).json({ status: 400, message: 'request required' });
  }

  await dbConfig('sto_table').where({ id: id }).update({
    sto_name: sto_name,
  });

  return res.status(200).json({
    status: 200,
    message: 'update successfully',
  });
}
