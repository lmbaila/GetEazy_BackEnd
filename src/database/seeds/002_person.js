
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('person').del()
    .then(function () {
      // Inserts seed entries
      return knex('person').insert([
        {
          first_name: 'Lazaro',
          last_name: 'Mbaila',
          gender: 'Male',
          phone_number: '824162984',
          email: 'lazarozito@gmail.com',
          id: '8e849djdk4'
        },

      ]);
    });
};
