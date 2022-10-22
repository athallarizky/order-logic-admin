exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('close_wo')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('close_wo').insert([
        {
          no_tiket: 'IN148120648',
          no_internet: '02179404947',
          code_sto: 'KAL',
          perbaikan: 'setting wifi',
          loker: 'DRAF',
          agen_hi: 'BENI',
          keterangan: 'VISIT TEKNISI',
          tanggal: '2022-10-16',
        },
        {
          no_tiket: 'IN112345678',
          no_internet: '0212345671',
          code_sto: 'BIN',
          perbaikan: 'perangkat pelanggan',
          loker: 'TAWHD',
          agen_hi: 'DONI',
          keterangan: 'CLOSE ONDESK',
          tanggal: '2021-10-17',
        },
        {
          no_tiket: 'IN148123331',
          no_internet: '02179401234',
          code_sto: 'JAG',
          perbaikan: 'ganti stb',
          loker: 'TAWHD',
          agen_hi: 'BAYU',
          keterangan: 'CLOSE ONDESK',
          tanggal: '2022-11-19',
        },
      ]);
    });
};
