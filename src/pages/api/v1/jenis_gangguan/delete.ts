import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') return res.status(405).json({ status: 405, message: 'Method not allowed' });

  let message;

  // const parsedData = JSON.parse(req.body);
  const { id_jenis_gangguan } = req.body.data;

  // const { id_jenis_gangguan } = req.body;
  if (!id_jenis_gangguan) {
    return res.status(400).json({ status: 400, message: 'id_jenis_gangguan required' });
  }

  const delagent = await dbConfig('jenis_gangguan_table')
    .where('id', id_jenis_gangguan)
    .join('jenis_gangguan_table', 'close_wo_table.id_gangguan')
    .del();

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
