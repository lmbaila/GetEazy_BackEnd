
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('person').del()
    .then(function () {
      // Inserts seed entries
      return knex('person').insert([
        {
          first_name: 'Suale Abdul',
          last_name: 'Suale',
          gender: 'Male',
          phone_number: '845725858',
          email: 'sualeabdul@plusteckgroup.com',
          id: '8e849djdk4'
        },

      ]);
    });
};
