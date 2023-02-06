const userService = require('../services/user.service')
const mongoose = require('mongoose');

const create = async (req, res) => {
    const {name, username, email, password, avatar, background}= req.body;

    if(!name || !username || !email || !password || !avatar || !background){
        res.status(400).send({message:"Submit all fields for registration"})
    }

    const user = await userService.createService(req.body) //usando o método create nosso userservice e passando o req.body pra ele, await = espera finalizar a execução para só depois continuar

    if(!user) { //caso ele não consiga criar o user, retorna o erro abaixo
        return res.status(400).send({message: "Error creating User"})
    }

    res.status(201).send({
        message: "User created succesfully",
        user: {
            id: user._id, //_id pq é dessa forma que é criado no MongoDB por padrão
            name,
            username,
            email,
            avatar,
            background,
        }
       
    })
};

const findAll = async (req, res) =>{ //esse findAll é do proprio controller
    const users = await userService.findAllService(); //E esse findAll é do userService, await pq vamos esperar retornar o resulta para então poder prosseguir

    if(users.lenght === 0){
        return res.status(400).send({message: "There are no registered users"});
    }

    res.send(users) //aqui estamos mandando os users que ele acha

}

const findById = async (req, res) =>{
    //O que queremos buscar aqui? Queremos buscar um usuário pelo Id, criamos então uma const id
    const id = req.params.id; //Aqui buscamos o parametro da requisição, caso na nossa rota o nome fosse outro que não id, então aqui apareceria o outro nome


    if(!mongoose.Types.ObjectId.isValid(id)){ //Aqui temos um mondulo prórpio do mongoose, isso está validando se o ObjectId (o ID) é um tipo valido para o mongoose
        return res.status(400).send({message:"Invalid ID"})
    }


    //O que qro agora? Buscar meu usuário, buscar onde? No DB, buscar no db pelo Id! E como eu acesso meu DB? Através do Service
    const user = await userService.findByIdService(id);

    if(!user){
        return res.send(400).send({message: "User not found"})
    }

    res.send(user)

}

module.exports = { create, findAll, findById }