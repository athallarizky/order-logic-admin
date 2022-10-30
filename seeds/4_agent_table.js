exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('agent_table')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('agent_table').insert([
        {
          name_agent: 'Spense',
        },
        {
          name_agent: 'Wallis',
        },
        {
          name_agent: 'Quincey',
        },
        {
          name_agent: 'Rhetta',
        },
        {
          name_agent: 'Geri',
        },
        {
          name_agent: 'Ann-marie',
        },
        {
          name_agent: 'Mozes',
        },
        {
          name_agent: 'Javier',
        },
        {
          name_agent: 'Zena',
        },
        {
          name_agent: 'Kori',
        },
        {
          name_agent: 'Kayne',
        },
        {
          name_agent: 'Padraig',
        },
        {
          name_agent: 'Traver',
        },
        {
          name_agent: 'Sandro',
        },
        {
          name_agent: 'Jan',
        },
      ]);
    });
};
