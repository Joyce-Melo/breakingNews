const User = require('../models/User'); //Importando o Schema que é nosso modelo do banco

const createService = (body) => User.create(body) // Recebe o que é passado no body e passa para o Schema o que recebeu no body
//O .create é um método do mongoose que irá criar um novo item dentro do nosso schema naquele padrão

const findAllService = () => User.find() //Precisamos usar apenas o .find() que é uma função do mongoose

const findByIdService = (id) => User.findById(id); //finByID também é um parametro próprio do mongoose

module.exports = {
    createService,
    findAllService,
    findByIdService,
}