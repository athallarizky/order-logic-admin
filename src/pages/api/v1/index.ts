// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';
import apiHandler from '@/helper/api/api';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;
  let message;
  if (req.method == 'GET') {
    if (id) {
      const data = await dbConfig('close_wo_table')
        .where('close_wo_table.id', id)
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
      if (data[0]) {
        return res.status(200).json({ users: data[0] });
      }
      return res.status(200).json({ message: 'Not found user.' });
    } else {
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
  } else if (req.method == 'DELETE') {
    if (id) {
      const delGangguan = await dbConfig('close_wo_table').where('id', id).del();
      if (delGangguan === 1) {
        message = 'delete successfully';
      } else {
        message = 'not found id';
      }
      return res.status(200).json({
        status: 200,
        message: message,
      });
    } else {
      return res.status(405).json({ message: 'Method not allowed.' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed.' });
  }
}

export default apiHandler(handler);
