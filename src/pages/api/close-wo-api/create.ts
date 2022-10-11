import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { no_ticket, no_internet, sto_code, repairment, loker, agent_hi, notes, date } = JSON.parse(req.body.data);

  const create = await dbConfig('close_wo').insert({
    no_tiket: no_ticket,
    no_internet,
    code_sto: sto_code,
    perbaikan: repairment,
    loker,
    agen_hi: agent_hi,
    keterangan: notes,
    tanggal: date,
  });

  const createdData = await dbConfig('close_wo').where('id', create).first();

  res.status(200).json({
    message: 'Data created successfully',
    data: createdData,
  });
}
