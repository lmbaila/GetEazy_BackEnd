const knex = require('./../database/index');

module.exports = {
  async index(req, res){
    const store = await knex('store').select('*');
    return res.json(store);
  },
  async create(req, res){
    const { id_user, store_name, nuit, bank_account, logo, status } = req.body;
    
    let inStore;

    try{
      const store = await knex('store').where({store_name}).orWhere({nuit}).first();
      if(store) return res.status(400).send({error: 'store already exists'});
      
      inStore = await connection('store').insert({
        id_user,
        store_name,
        nuit,
        bank_account,
        logo,
        status,
      });
      
      return res.json(inStore);
    } catch(err){
      return res.status(400).send({error: 'Registration failed'});
    }
  },
  async delete(req, res){

  },
  async filter(req, res){

  },

}