exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('sto_table')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('sto_table').insert([
        {
          sto_name: 'KBB',
        },
        {
          sto_name: 'PSM',
        },
        {
          sto_name: 'KBB',
        },
        {
          sto_name: 'KMG',
        },
        {
          sto_name: 'KMG',
        },
        {
          sto_name: 'PSM',
        },
        {
          sto_name: 'PSM',
        },
        {
          sto_name: 'KAL',
        },
        {
          sto_name: 'KAL',
        },
      ]);
    });
};
