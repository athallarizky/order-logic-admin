import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';
import apiHandler from '@/helper/api/api';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') return res.status(405).json({ status: 405, message: 'Method not allowed' });

  let message;

  // const parsedData = JSON.parse(req.body);
  // const { id_sto } = parsedData.data;

  const { id_sto } = req.body.data;

  // const { id_sto } = req.body;
  if (!id_sto) {
    return res.status(400).json({ status: 400, message: 'id_sto required' });
  }

  const delagent = await dbConfig('sto_table').where('id', id_sto).join('sto_table', 'close_wo_table.id_sto').del();

  if (delagent === 1) {
    message = 'delete successfully';
  } else {
    message = 'not found id';
  }
  return res.status(200).json({
    status: 200,
    message,
  });
}

export default apiHandler(handler);
