import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  /* POSTMAN */
  const {
    no_tiket,
    no_internet,
    no_telp,
    code_sto,
    source,
    code_agent,
    code_gangguan,
    detail_gangguan,
    perbaikan,
    tanggal,
  } = req.body;

  const create = await dbConfig('close_wo').insert({
    no_tiket,
    no_internet,
    no_telp,
    id_sto: code_sto,
    source,
    id_agent: code_agent,
    id_gangguan: code_gangguan,
    detail_gangguan,
    perbaikan,
    tanggal,
  });

  const createdData = await dbConfig('close_wo').where('id', create).first();

  return res.status(200).json({
    message: 'Data created successfully',
    data: createdData,
  });
}
