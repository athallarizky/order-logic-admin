import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('close_wo_table', table => {
    table.increments('id').primary();
    table.string('no_tiket');
    table.string('no_internet', 30);
    table.integer('no_telp', 14);
    table.integer('id_sto').unsigned().index().references('id').inTable('sto_table').onDelete('SET NULL');
    table.enum('source', ['group', 'draft']).notNullable();
    table.integer('id_agent').unsigned().index().references('id').inTable('agent_table').onDelete('SET NULL');
    table
      .integer('id_gangguan')
      .unsigned()
      .index()
      .references('id')
      .inTable('jenis_gangguan_table')
      .onDelete('SET NULL');
    table.text('detail_gangguan');
    table.text('perbaikan');
    table.date('tanggal');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists('close_wo_table');
}
