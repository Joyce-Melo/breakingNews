const User = require("../models/User"); //Importando o Schema que é nosso modelo do banco

const createService = (body) => User.create(body); // Recebe o que é passado no body e passa para o Schema o que recebeu no body
//O .create é um método do mongoose que irá criar um novo item dentro do nosso schema naquele padrão

const findAllService = () => User.find(); //Precisamos usar apenas o .find() que é uma função do mongoose

const findByIdService = (id) => User.findById(id); //finByID também é um parametro próprio do mongoose

const updateService = (
  id,
  name,
  username,
  email,
  password,
  avatar,
  background
) =>
  User.findOneAndUpdate( //Passamos então dois ojetos, o primeiro é pelo que devemos procurar, no nosso caso é o id, o id no mongoDB é _id, então por isso colocamos _id:id, e o segundo objeto são os campos que quero atualizar
    { _id: id },
    { name, username, email, password, avatar, background }
  ); //acha um pelo id e faz o update do campo solicitado

module.exports = {
  createService,
  findAllService,
  findByIdService,
  updateService,
};
