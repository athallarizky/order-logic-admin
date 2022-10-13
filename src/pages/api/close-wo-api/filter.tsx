import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { data } = JSON.parse(req.body);

  const filteredData = await dbConfig('close_wo').whereRaw(`
      no_tiket like '%${data.no_ticket}%'
      or no_internet like '%${data.no_internet}%'
      or code_sto like '%${data.sto_code}%'
      or perbaikan like '%${data.repairment}%'
      or loker like '%${data.loker}%'
      or agen_hi like '%${data.agent_hi}%'
      or keterangan like '%${data.notes}%'
      or tanggal like '%${data.date}%'
    `);

  return res.status(200).json({
    message: 'Data created successfully',
    data: filteredData,
  });
}
