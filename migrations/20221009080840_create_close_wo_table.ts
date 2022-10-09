import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('close_wo', table => {
    table.uuid('id').primary();
    table.string('no_tiket').notNullable();
    table.string('no_internet').notNullable();
    table.string('code_sto').notNullable();
    table.string('perbaikan').notNullable();
    table.string('loker').notNullable();
    table.string('agen_hi').notNullable();
    table.text('keterangan').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('close_wo');
}
