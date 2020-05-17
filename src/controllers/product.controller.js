const knex = require('./../database/index');
const crypto = require('crypto');

module.exports = {
  async index(req, res){
    const product = await knex('product').select('*');
    return res.json(product);
  },
  async create(req, res){
    const { product_name, quantity, brand, description, price } = req.body;
    let inProduct; 

    try{
      const product = await knex('product').where({product_name}).first();
      if(product) return res.status(400).send({error: 'product already exists'});
      
      inProduct = await knex('product').insert({
        product_name, 
        quantity, 
        brand, 
        description, 
        price
      });
      
      return res.json(inProduct);
    } catch(err){
      console.log(err);
      return res.status(400).send({error: 'Registration failed'});
    }
  },
  async delete(req, res){
    const { id } = req.params;
    let inProduct; 

    const product = await knex('product')
      .where('id_product', id)
      .first();

      if (product.id_product !== id) {
        return res.status(401).json({ error: 'Product not a found!'});
      }

      inProduct = await knex('product').where('id_product', id).delete();

      return res.status(204).send({message: 'Deleting successfull!'});
  },
  async update(req, res){
    const { id } = req.params;
    const { product_name, quantity, brand, description, price } = req.body;
    let inProduct; 

    const product = await knex('product')
      .where('id_product', id)
      .first();

      if (product.id_product !== id) {
        return res.status(401).json({ error: 'Product not a found!'});
      }

      inProduct = await knex("product")
        .update({
          product_name, 
          quantity, 
          brand, 
          description, 
          price})
        .where('id_product', id)
        .then(rows => {
          if (!rows){
            return res.status(404).json({success:false});
          }
          return res.json({success:true});
        })
        .catch( e => res.status(500).json(e)); 
  },
  async filter(req, res){

  },

}