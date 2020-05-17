const bcrypt = require('bcryptjs');
exports.seed = async function(knex) {
  const password = await bcrypt.hash('12345678', 10);
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id:'8e849djdk4',
          username: 'ssuale',                     
          login_with: 'register',             
          user_type: 'admin',             
          access: 'accepted',               
          password
        }
      ]);
    });
};
