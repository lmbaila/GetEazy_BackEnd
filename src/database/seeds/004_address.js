
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('address').del()
    .then(function () {
      // Inserts seed entries
      return knex('address').insert([
        {id_user: '8e849djdk4',latitude: '1392981821',longitude: '-319329E322', province_code: 'MZ-MPM', address_name: 'Hulene A, Av. Julilus Nherere'}
      ]);
    });
};
