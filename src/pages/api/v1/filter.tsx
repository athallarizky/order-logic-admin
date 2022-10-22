import type { NextApiRequest, NextApiResponse } from 'next';
import dbConfig from '@/configs/dbConfig';
import Knex from 'knex';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const currentYear = new Date().getFullYear();

  const parsedData = JSON.parse(req.body.data);
  // console.log('dataxxxx', parsedData.no_tiket);
  const { no_tiket, no_internet, code_sto, loker, agen_hi, keterangan, perbaikan, bulan, tanggal } = parsedData;

  console.log('tanggal', tanggal);

  const filteredData = await dbConfig('close_wo')
    .select('*', dbConfig.raw("DATE_FORMAT(tanggal, '%Y-%m-%d') as tanggal"))
    .modify(function (queryBuilder) {
      if (no_tiket) {
        queryBuilder.where('no_tiket', no_tiket);
      } else if (no_internet) {
        queryBuilder.where('no_internet', no_internet);
      } else if (code_sto) {
        queryBuilder.where('code_sto', code_sto);
      } else if (perbaikan) {
        queryBuilder.where('perbaikan', perbaikan);
      } else if (loker) {
        queryBuilder.where('loker', loker);
      } else if (agen_hi) {
        queryBuilder.where('agen_hi', agen_hi);
      } else if (keterangan) {
        queryBuilder.where('keterangan', keterangan);
      } else if (tanggal) {
        queryBuilder.where('tanggal', tanggal);
      }
      if (bulan) {
        queryBuilder.where(
          dbConfig.raw(`EXTRACT(MONTH FROM tanggal) = ? AND EXTRACT(YEAR FROM tanggal) = ?`, [bulan, currentYear]),
        );
      } else if (tanggal) {
        queryBuilder.where(dbConfig.raw(`DAY(tanggal) = ? AND EXTRACT(YEAR FROM tanggal) = ?`, [tanggal, currentYear]));
      }
    });

  // console.log(filteredData);
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
