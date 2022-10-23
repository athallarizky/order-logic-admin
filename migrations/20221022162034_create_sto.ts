import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('sto_table', table => {
    table.increments('id').primary();
    table.string('sto_name', 100).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('sto_table');
}
