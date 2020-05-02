
exports.up = function(knex) {
  return knex.schema.createTable('address', function(table){
    table.increments('id_address').primary();
    table.string('id_user').notNullable();
    table.string('province_code', 10).notNullable();
    table.string('address_name', 150).notNullable();
    table.string('latitude', 20);
    table.string('longitude', 20);
    table.datetime('created_at').defaultTo(knex.fn.now());
    table.datetime('updated_at').defaultTo(knex.fn.now());
    table.foreign('province_code').references('province_code').inTable('province').onDelete('SET NULL'); 
    table.foreign('id_user').references('id').inTable('users').onDelete('CASCADE');
  });
};

exports.down = function(knex) {
 return knex.schema.dropTable('address');
};