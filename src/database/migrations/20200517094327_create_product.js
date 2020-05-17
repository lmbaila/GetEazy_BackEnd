
exports.up = function(knex) {
    return knex.schema.createTable('product', function(table){
      table.increments('id_product').primary();
      table.string('product_name',100).unique().notNullable();
      table.integer('quantity').notNullable();
      table.string('brand').notNullable();
      table.string('description').defaultTo('');
      table.decimal('price',14,2).notNullable();
      table.datetime('created_at').defaultTo(knex.fn.now());
      table.datetime('updated_at').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
   return knex.schema.dropTable('product');
  };