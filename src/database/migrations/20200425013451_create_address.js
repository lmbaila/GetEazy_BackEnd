
exports.up = function(knex) {
  return knex.schema.createTable('address', function(table){
    table.increments('id_address');   
    table.timestamps(true);
  });
};

exports.down = function(knex) {
 return knex.schema.dropTable('address');
};