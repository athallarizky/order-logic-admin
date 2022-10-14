import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { no_tiket, no_internet, code_sto, perbaikan, loker, agen_hi, keterangan, tanggal } = JSON.parse(req.body.data);

  const create = await dbConfig('close_wo').insert({
    no_tiket,
    no_internet,
    code_sto,
    perbaikan,
    loker,
    agen_hi,
    keterangan,
    tanggal,
  });

  const createdData = await dbConfig('close_wo').where('id', create).first();

  return res.status(200).json({
    message: 'Data created successfully',
    data: createdData,
  });
}
