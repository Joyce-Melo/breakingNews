//Para testarmos o ID precisamos do mongoose, então importamos ele
import mongoose from 'mongoose';
//Para verificarmos o usuário precisamos busca-lo no db, e fazemos essa busca através do service
import userService from "../services/user.service.js"; 

//Construção de um middleware, começamos com uma função que recebe 3 parametros

export const validId = (req, res, next) => {
       try { //O que queremos buscar aqui? Queremos buscar um usuário pelo Id, criamos então uma const id
        const id = req.params.id; //Aqui buscamos o parametro da requisição, caso na nossa rota o nome fosse outro que não id, então aqui apareceria o outro nome


        if(!mongoose.Types.ObjectId.isValid(id)){ //Aqui temos um mondulo prórpio do mongoose, isso está validando se o ObjectId (o ID) é um tipo valido para o mongoose
            return res.status(400).send({message:"Invalid ID"});
        }

    next() //serve para ele executar a próxima função que está sendo chamada
    } catch (err){
        res.status(500).send({messaage: err.messaage}) 
    }
};

export const validUser = async (req, res, next) => {
   try {
     const id = req.params.id; 


    const user = await userService.findByIdService(id);

    if(!user){
        return res.status(400).send({message: "User not found"})
    }

    //Na nossa próxima função iremos utilizar o user e o id, então podemos interceptar eles aqui e enviar a requisição lá para o controller, então assim o controller não precisará mais pegar de parametro, pois já estou pegando eles, como parametro da requisição ali em cima na validação, então já mando eles para serem usados no controller na próxima função
    req.id = id;
    req.user = user;

    next()
} catch (err){
    res.status(500).send({messaage: err.messaage}) //mando então a mensagem de erro

}
};

