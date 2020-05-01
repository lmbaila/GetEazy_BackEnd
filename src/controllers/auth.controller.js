const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const authConfig = require('../config/auth.json');
const Mailer = require('../module/Mailer');
const jwt = require('jsonwebtoken');
const knex = require('./../database/index');
module.exports = {
  async index(req, res){
   const user = await knex('users').select('*');
   return res.json(user);
  },
  async create(req, res){
    const {username,  user_type, password, access, first_name, last_name, gender, phone_number, email} = req.body;
    const id = `${crypto.randomBytes(4).toString('Hex')}${last_name[0]}${first_name[0]}`;
    let iter; 
    try{
      const user = await knex('person').where({phone_number}).orWhere({email}).first();
      if(user) return res.status(400).send({error: 'user already exists'});
      const password_hash = await bcrypt.hash(password, 10);
      
      iter =  await knex('users').insert({
        id,
        username,
        password: password_hash,
        username,
        access,
        user_type
      }); 
    if(iter){
      await knex('person').insert({
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
      return res.status(400).send({error: 'Registration failed'});
    }
  },
  async autheticate(req, res){
    const {email, password} = req.body;
    const phone_number = email;
    try{
      const user = await knex('users')
      .join('person', 'person.id','=', 'users.id').where({email}).orWhere({phone_number}).select('*').first();
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
  },

  async forgotPassword(req, res){
    const {email, phone_number}  = req.body;
    try{
      const user = await knex('users')
            .innerJoin('person', 'users.id', 'person.id')
            .select('users.id as id', 'email', 'phone_number', 'username')
            .where({email}).orWhere({phone_number}).first();

      if(!user) return res.status(400).send({error: 'user  not found'});
      
      const password_reset_token = crypto.randomBytes(20).toString('hex'); 
      const password_reset_expires = new Date();
      password_reset_expires.setHours(password_reset_expires.getHours() + 1);
      const setToken = await knex('users')
              .where({id: user.id})
              .update({ password_reset_token, password_reset_expires });
      if(setToken === 0){
        return res.status(400).send({error: 'can not send forgot password mail'});
      }
      Mailer.sendMail({
        to: user.email,
        from: 'geteasy@plusteck.com',
        subject: 'forgot_password',
        text: `recuperacao de senha token www.geteasy.plusteck.co.mz/fogot_password?auth=${password_reset_token}`,
        html: `recuperacao de senha token <a href='www.geteasy.plusteck.co.mz/fogot_password?auth=${password_reset_token}'>link</a>`,
    }, (err) => {
        if(err)
           return res.status(400).send({error: 'can not send forgot password mail'});
    });
    return res.status(200).send({message: 'email sent'});
    }catch(err){
      console.log(err);
        return res.status(400).send({error: 'Erro on fogot passoword,  try again. '+ err});
    } 
  }

};
