import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';
import apiHandler from '@/helper/api/api';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { no_tiket, no_internet, no_telp, id_sto, source, id_agent, id_gangguan, detail_gangguan, perbaikan, tanggal } =
    req.body.data;

  const create = await dbConfig('close_wo_table').insert({
    no_tiket,
    no_internet,
    no_telp,
    id_sto,
    source,
    id_agent,
    id_gangguan,
    detail_gangguan,
    perbaikan,
    tanggal,
  });

  const createdData = await dbConfig('close_wo_table').where('id', create).first();

  return res.status(200).json({
    status: 200,
    message: 'Data created successfully',
    data: createdData,
  });
}

export default apiHandler(handler);
