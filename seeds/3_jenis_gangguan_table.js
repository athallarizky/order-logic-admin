exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('jenis_gangguan_table')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('jenis_gangguan_table').insert([
        {
          jenis_gangguan: 'PON BLINKING',
        },
        {
          jenis_gangguan: 'PINDAH ODP',
        },
        {
          jenis_gangguan: 'INET TBB',
        },
        {
          jenis_gangguan: 'INET LAMBAT',
        },
        {
          jenis_gangguan: 'VOIP MATI',
        },
        {
          jenis_gangguan: 'TV 1302',
        },
        {
          jenis_gangguan: 'LIVE TV BLANK',
        },
        {
          jenis_gangguan: 'GANTI ONT',
        },
      ]);
    });
};
