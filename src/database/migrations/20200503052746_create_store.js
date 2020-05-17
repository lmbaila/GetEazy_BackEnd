/** @js-migrations/knex */

exports.up = function(knex) {
  return knex.schema.createTable('store', function(table){
    table.string('id_store', 10).primary();
    table.string('id_user').notNullable();
    table.string('store_name',100).unique().notNullable();
    table.string('nuit', 12).unique();
    table.string('bank_account').unique().defaultTo('');
    table.string('logo').defaultTo('avatar_logo');
    table.enu('status', ['disabled', 'enabled']).defaultTo('enabled');
    table.datetime('created_at').defaultTo(knex.fn.now());
    table.datetime('updated_at').defaultTo(knex.fn.now());
    table.foreign('id_user').references('id').inTable('users').onDelete('CASCADE');
  });
};

exports.down = function(knex) {
 return knex.schema.dropTable('store');
};