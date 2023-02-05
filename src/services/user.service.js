const User = require('../models/User'); //Importando o Schema que é nosso modelo do banco

const create = (body) => User.create(body) // Recebe o que é passado no body e passa para o Schema o que recebeu no body
//O .create é um método do mongoose que irá criar um novo item dentro do nosso schema naquele padrão

module.exports = {
    create,
}