import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';
import Knex from 'knex';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { code_sto, agen_hi, perbaikan, bulan, tanggal } = req.body;
  const currentYear = new Date().getFullYear()

  console.log('data', tanggal);

  const filteredData = await dbConfig('close_wo').select('*', dbConfig.raw("DATE_FORMAT(tanggal, '%Y-%m-%d') as tanggal")).modify(function (queryBuilder) {
    if (code_sto) {
      queryBuilder.where('code_sto', code_sto);
    } else if (agen_hi) {
      queryBuilder.where('agen_hi', agen_hi);
    } else if (perbaikan) {
      queryBuilder.where('perbaikan', perbaikan);
    }
    if (bulan) {
      queryBuilder.where(dbConfig.raw(`EXTRACT(MONTH FROM tanggal) = ? AND EXTRACT(YEAR FROM tanggal) = ?`, [bulan, currentYear]))
    } else if (tanggal) {
      queryBuilder.where(dbConfig.raw(`DAY(tanggal) = ? AND EXTRACT(YEAR FROM tanggal) = ?`, [tanggal, currentYear]));
    }
  });
  console.log(filteredData);
  // console.log(
  //   'DEBUG QUERY',
  //   dbConfig('close_wo')
  //     .whereRaw(
  //       `
  //   no_tiket like "%${data.no_tiket}%"
  //   or no_internet like "%${data.no_internet}%"
  //   or code_sto like "%${data.code_sto}%"
  //   or perbaikan like "%${data.perbaikan}%"
  //   or loker like "%${data.loker}%"
  //   or agen_hi like "%${data.agen_hi}%"
  //   or keterangan like "%${data.keterangan}%"
  //   or tanggal like "%${data.tanggal}%"
  // `,
  //     )
  //     .toSQL()
  //     .toNative(),
  // );

  /// HOOPSSCOT
  // const data = JSON.parse(req.body);
  // const filteredData = await dbConfig('close_wo').whereRaw(`
  //     no_tiket like '%${data.data.no_tiket}%'
  //     or no_internet like '%${data.data.no_internet}%'
  //     or code_sto like '%${data.data.code_sto}%'
  //     or perbaikan like '%${data.data.perbaikan}%'
  //     or loker like '%${data.data.loker}%'
  //     or agen_hi like '%${data.data.agen_hi}%'
  //     or keterangan like '%${data.data.keterangan}%'
  //     or tanggal like '%${data.data.tanggal}%'
  //   `);

  /// HOOPSSCOT DEBUG QUERY
  // console.log(
  //   'HOOPSSCOT QUERY',
  //   dbConfig('close_wo')
  //     .whereRaw(
  //       `
  //   no_tiket like "%${data.data.no_tiket}%"
  //   or no_internet like "%${data.data.no_internet}%"
  //   or code_sto like "%${data.data.code_sto}%"
  //   or perbaikan like "%${data.data.perbaikan}%"
  //   or loker like "%${data.data.loker}%"
  //   or agen_hi like "%${data.data.agen_hi}%"
  //   or keterangan like "%${data.data.keterangan}%"
  // `,
  //     )
  //     .toSQL()
  //     .toNative(),
  // );

  // console.log('filteredData', filteredData);

  return res.status(200).json({
    message: 'Data created successfully',
    data: filteredData,
  });
}
