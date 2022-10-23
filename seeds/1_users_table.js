import bcrypt from "bcrypt";

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users_table')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users_table').insert([
        {
          full_name: 'Gwenda Dilay',
          national_identity_number: '12345678990123456',
          password: bcrypt.hashSync("asda", bcrypt.genSaltSync(10)),
        },
      ]);
    });
};
