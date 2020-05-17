const knex = require('./../database/index');
const crypto = require('crypto');

module.exports = {
  async index(req, res){
    const store = await knex('store').select('*');
    return res.json(store);
  },
  async create(req, res){
    const { id_user, store_name, nuit, bank_account, logo, status } = req.body;
    const id_store = `${crypto.randomBytes(4).toString('Hex')}${nuit[0]}${bank_account[0]}`;
    let inStore; 

    try{
      const store = await knex('store').where({store_name}).orWhere({nuit}).first();
      if(store) return res.status(400).send({error: 'store already exists'});
      
      inStore = await knex('store').insert({
        id_store,
        id_user,
        store_name,
        nuit,
        bank_account,
        logo,
        status,
      });
      
      return res.json(inStore);
    } catch(err){
      console.log(err);
      return res.status(400).send({error: 'Registration failed'});
    }
  },
  async delete(req, res){
    const { id } = req.params;
    let inStore; 

    const store = await knex('store')
      .where('id_store', id)
      .first();

      if (store.id_store !== id) {
        return res.status(401).json({ error: 'Store not a found!'});
      }

      inStore = await knex('store').where('id_store', id).delete();

      // if(inStore){
        return res.status(204).send({message: 'Deleting successfull!'});
      // }else{
      //   return res.status(401).json({ error: 'Deleting failed!'});
      // }
      
    },
  async filter(req, res){

  },

}