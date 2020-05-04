
exports.up = function(knex) {
  return knex.schema.createTable('payment_method_store', function(table){
    table.string('id_payment_method_store', 10).primary();
    table.string('id_store', 10).notNullable();
    table.string('visa_nib', 21).unique().defaultTo(null);
    table.string('paypal_account', 30).unique().defaultTo(null);
    table.string('m_pesa', 10).unique().defaultTo(null);
    table.datetime('created_at').defaultTo(knex.fn.now());
    table.datetime('updated_at').defaultTo(knex.fn.now());
    table.foreign('id_store').references('id_store').inTable('store').onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('payment_method_store');
 };