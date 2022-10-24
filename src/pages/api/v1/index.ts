// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();
  const data = await dbConfig('close_wo_table')
    .select(
      'close_wo_table.id',
      'no_tiket',
      'source',
      'sto_table.sto_name as sto',
      'no_internet',
      'no_telp',
      'agent_table.name_agent as agent',
      'jenis_gangguan_table.jenis_gangguan as jenis_gangguan',
      'detail_gangguan',
      'perbaikan',
      'tanggal',
      'close_wo_table.created_at',
    )
    .join('sto_table', 'sto_table.id', '=', 'close_wo_table.id_sto')
    .join('agent_table', 'agent_table.id', '=', 'close_wo_table.id_agent')
    .join('jenis_gangguan_table', 'jenis_gangguan_table.id', '=', 'close_wo_table.id_gangguan');
  return res.status(200).json({
    data,
  });
}
