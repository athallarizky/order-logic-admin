exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('close_wo_table')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('close_wo_table').insert([
        {
          no_tiket: 'IN148120648',
          no_internet: '02179404947',
          id_sto: 1,
          source: 'group',
          id_agent: 2,
          id_gangguan: 4,
          keterangan: 'VISIT TEKNISI',
          tanggal: '2022-10-16',
        },
        {
          no_tiket: 'IN112345678',
          no_internet: '0212345671',
          id_sto: 4,
          source: 'group',
          id_agent: 2,
          id_gangguan: 1,
          keterangan: 'CLOSE ONDESK',
          tanggal: '2022-10-16',
        },
        {
          no_tiket: 'IN148123331',
          no_internet: '02179401234',
          id_sto: 1,
          source: 'draft',
          id_agent: 4,
          id_gangguan: 5,
          keterangan: 'VISIT TEKNISI',
          tanggal: '2022-10-16',
        },
      ]);
    });
};
