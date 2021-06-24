const bcrypt = require("bcryptjs");
const { update } = require("../models/User");

const User = require("../models/User");
const { get } = require("../routes");

module.exports = {
  async index(req, res) {
    const user = await User.findAll();
    res.send(user);
  },


  async store(req, res) {
    const { name, cpf, email, cellphone, password } = req.body;

    let user = await User.findOne({ where: { cpf: cpf } });

    if (user) return res.status(400).json({ error: "cpf already exists" });

    user = await User.findOne({ where: { email: email } });

    if (user) return res.status(400).json({ error: "email already exists" });

    const cryptPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      cpf,
      email,
      cellphone,
      password: cryptPassword,
    });

    user = user.dataValues;

    delete user.password;

    return res.status(201).send(user);
  },

  //const result = await Project.update({  },{ where: { _id: 1 } })
  async update(req,res){
  
    const { name, cpf, email, cellphone, password } = req.body;
    const {id} = req.params
    let user = await User.findOne({ where: { id: id } });
    if (!user) return res.status(400).json({ error: "id não existente" });

    const cryptPassword = await bcrypt.hash(password, 10);
    
    user = await User.update({name,cpf,email,cellphone,password: cryptPassword },{ where: { id: req.params.id }})

    return res.status(201).send({okay:"Ok, User has been updated"});
  },
  
  
  async search(req,res){
    const {id} = req.params
    const user = await User.findAll({ where: { id: req.params.id } });
    res.send(user);
  },

  async delete(req,res){
    const {id} = req.params
    let user = await User.findOne({ where: { id: id } });

    if (!user) return res.status(400).json({ error: "id não existente" });


    user = await User.destroy({ where: { id: req.params.id } })
    return res.status(201).send({okay:"Ok, User has been deleted"});
  },


};
