const route = require ('express').Router(); //Chamando o express, executando o route de lá e já atribuindo a variavel
const userController = require('../controllers/user.controller') //importando o controlle


route.post("/", userController.create ) //cpassando o controller como parametro da função, pois é ele que irá lidar com o req e o res
route.get("/", userController.findAll ); //buscando todos os usuários
route.get("/:id", userController.findById) //buscando um usuário com um ID especifico, os : representa que é um parametro, o id é o nome que eu dei para o parametro
route.patch("/:id", userController.update)


module.exports = route; //exportando o route para que possamos utilizar em outro arquivo