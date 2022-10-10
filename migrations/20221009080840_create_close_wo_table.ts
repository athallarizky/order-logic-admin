import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('close_wo', table => {
    table.increments('id').primary();
    table.string('no_tiket');
    table.string('no_internet');
    table.string('code_sto');
    table.string('perbaikan');
    table.string('loker');
    table.string('agen_hi');
    table.text('keterangan');
    table.date('tanggal');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('close_wo');
}
