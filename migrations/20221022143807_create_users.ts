import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users_table', table => {
    table.increments('id').primary();
    table.string('full_name', 100).notNullable();
    table.string('national_identity_number', 17).notNullable();
    table.string('password', 100).notNullable();
    table.string('level', 100).notNullable();
    table.enum('status', ['Aktif', 'Tidak Aktif']).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
