
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('province').del()
    .then(function () {
      // Inserts seed entries
      return knex('province').insert([
       {province_code: 'MZ-MPM', province_name: 'Maputo Cidade'},
       {province_code: 'MZ-P', province_name: 'Cabo Delgado'},
       {province_code: 'MZ-G', province_name: 'Gaza'},
       {province_code: 'MZ-I', province_name: 'Inhambane'},
       {province_code: 'MZ-B', province_name: 'Manica'},
       {province_code: 'MZ-L', province_name: 'Maputo Provincia'},
       {province_code: 'MZ-N', province_name: 'Nampula'},
       {province_code: 'MZ-A', province_name: 'Niassa'},
       {province_code: 'MZ-S', province_name: 'Sofala'},
       {province_code: 'MZ-T', province_name: 'Tete'},
       {province_code: 'MZ-Q', province_name: 'Zambézia'},
      ]);
    });
};
