
exports.up = function(knex) {
  return knex.schema.createTable('person', function(table){
    table.increments('id_person').primary();

    table.string('first_name', 50).unique().notNullable();
    table.string('last_name', 50).unique().notNullable();
    table.enu('gender', ['Male', 'Female']);
    table.string('phone_number', 14).unique().notNullable();
    table.string('email', 100);
    table.timestamps(true);

    table.string('id').notNullable();
    table.foreign('id').references('id').inTable('user');
  });
};

exports.down = function(knex) {
 return knex.schema.dropTable('person');
};