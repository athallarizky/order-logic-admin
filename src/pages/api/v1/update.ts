// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';
import apiHandler from '@/helper/api/api';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') return res.status(405).end();

  const {
    id,
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
  } = req.body.data;

  await dbConfig('close_wo_table').where({ id: id }).update({
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

  return res.status(200).json({
    message: 'Update Success',
  });
}

export default apiHandler(handler);
