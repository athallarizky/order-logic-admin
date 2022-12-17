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
          password: bcrypt.hashSync("password", bcrypt.genSaltSync(10)),
          level: 'Member',
          status: 'Aktif',
        },
        {
          full_name: 'Jijay',
          national_identity_number: '12345678990123451',
          password: bcrypt.hashSync("password", bcrypt.genSaltSync(10)),
          level: 'Admin',
          status: 'Aktif',
        },
        {
          full_name: 'Karna',
          national_identity_number: '0987654321098761',
          password: bcrypt.hashSync("password", bcrypt.genSaltSync(10)),
          level: 'Member',
          status: 'Tidak Aktif',
        },
      ]);
    });
};
