
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table){
    table.string('id').primary();
    table.string('username', 30).unique();
    table.text('social_token');
    table.enu('login_with', ['facebook', 'google', 'register']).defaultTo('register');
    table.enu('user_type', ['guest', 'g-store', 'admin']).defaultTo('guest');
    table.enu('access', ['denied', 'accepted']).defaultTo('accept');
    table.text('password').notNullable();
    table.string('password_reset_token');
    table.datetime('password_reset_expires');
    table.datetime('created_at').defaultTo(knex.fn.now());
    table.datetime('updated_at').defaultTo(knex.fn.now());  
  });
};

exports.down = function(knex) {
 return knex.schema.dropTable('users');
};

