//Para testarmos o ID precisamos do mongoose, então importamos ele
const mongoose = require("mongoose");
//Para verificarmos o usuário precisamos busca-lo no db, e fazemos essa busca através do service
const userService = require("../services/user.service");

//Construção de um middleware, começamos com uma função que recebe 3 parametros

const validId = (req, res, next) => {
        //O que queremos buscar aqui? Queremos buscar um usuário pelo Id, criamos então uma const id
        const id = req.params.id; //Aqui buscamos o parametro da requisição, caso na nossa rota o nome fosse outro que não id, então aqui apareceria o outro nome


        if(!mongoose.Types.ObjectId.isValid(id)){ //Aqui temos um mondulo prórpio do mongoose, isso está validando se o ObjectId (o ID) é um tipo valido para o mongoose
            return res.status(400).send({message:"Invalid ID"});
        }

    next() //serve para ele executar a próxima função que está sendo chamada
    
};

const validUser = async (req, res, next) => {
    const id = req.params.id; 


    const user = await userService.findByIdService(id);

    if(!user){
        return res.send(400).send({message: "User not found"})
    }

    req.id = id;
    req.user = user;

    next()
};

module.exports = { validId, validUser };