
exports.up = function(knex) {
  return knex.schema.createTable('user', function(table){
    table.increments('id').primary();
    table.string('username', 30).unique().notNullable();
    table.text('social_token');
    table.string('login_with');
    table.string('user_type').notNullable();
    table.string('access').notNullable();
    table.text('password').notNullable();
    table.timestamps(true);
  });
};

exports.down = function(knex) {
 return knex.schema.dropTable('user');
};

