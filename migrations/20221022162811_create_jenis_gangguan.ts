import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('jenis_gangguan_table', table => {
    table.increments('id').primary();
    table.string('jenis_gangguan', 100).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('jenis_gangguan_table');
}
