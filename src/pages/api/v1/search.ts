import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';
import apiHandler from '@/helper/api/api';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const parsedData = JSON.parse(req.body);
  const { data } = parsedData;
  // console.log('typeof req.body====================================', data.no_tiket);

  const filteredData = await dbConfig('close_wo_table')
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
      dbConfig.raw("DATE_FORMAT(tanggal, '%d-%m-%Y') as tanggal"),
    )
    .join('sto_table', 'sto_table.id', '=', 'close_wo_table.id_sto')
    .join('agent_table', 'agent_table.id', '=', 'close_wo_table.id_agent')
    .join('jenis_gangguan_table', 'jenis_gangguan_table.id', '=', 'close_wo_table.id_gangguan')
    .where(dbConfig.raw('extract(day from tanggal)'), `${data.daily}`)
    .orWhere(dbConfig.raw('extract(month from tanggal)'), `${data.month}`)
    .orWhere('close_wo_table.id_sto', `${data.id_sto}`);

  return res.status(200).json({
    message: 'Filter Success',
    data: filteredData,
  });
}

export default apiHandler(handler);
