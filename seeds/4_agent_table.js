exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('agent_table')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('agent_table').insert([
        { name_agent: 'Jhon' },
        { name_agent: 'Ricky' },
        { name_agent: 'Hangga' },
        { name_agent: 'Doni' },
        { name_agent: 'Fahrul' },
      ]);
    });
};
