const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const authConfig = require('../config/auth.json');

const jwt = require('jsonwebtoken');
const connection = require('./../database/connection');
module.exports = {
  async index(req, res){
   const user = await connection('user').select('*');
   return res.json(user);
  },
  async create(req, res){
    const {username,  user_type, password, access, first_name, last_name, gender, phone_number, email} = req.body;
    const id = `${crypto.randomBytes(4).toString('Hex')}${last_name[0]}${first_name[0]}`;
    let iter; 
    try{
      const user = await connection('person').where({phone_number}).orWhere({email}).first();
      if(user) return res.status(400).send({error: 'user already exists'});
      const password_hash = await bcrypt.hash(password, 10);
      
      iter =  await connection('user').insert({
        id,
        username,
        password: password_hash,
        username,
        access,
        user_type
      }); 
    if(iter){
      await connection('person').insert({
        first_name,
        last_name,
        gender,
        phone_number,
        email,
        id
      })
    } 
     return res.json( iter );
    } catch(err){
      console.log(err);
      return res.status(400).send({error: 'Registration failed'});
    }
  },
  async autheticate(req, res){
    const {email, password} = req.body;
    const phone_number = email;
    try{
      const user = await connection('user')
      .join('person', 'person.id','=', 'user.id').where({email}).orWhere({phone_number}).select('*').first();
      if(!user){
        return res.status(400).send({label: 'username', message: 'User not found'});
      } 
      if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign({ id: user.id}, authConfig.secret, {
          expiresIn: '7 days',
        });
        user.id =undefined;
        user.password =undefined;
        //user.access = undefined;
        //user.user_type = undefined;
        user.login_with = undefined;;
        user.id_person = undefined;
        user.created_at= undefined ;
        user.updated_at= undefined;
        const social_token = user.social_token;
        user.social_token = undefined;
        return res.status(200).json({token,social_token, user});
      }
      return res.status(400).send({label: 'password', message: 'Invalid password'});
    }catch(err){
      return res.status(400).send({error: err});
    }
  }

  


};
