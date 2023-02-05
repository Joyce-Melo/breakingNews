const route = require ('express').Router(); //Chamando o express, executando o route de lá e já atribuindo a variavel
const userController = require('../controllers/user.controller') //importando o controlle


route.post("/", userController.create ) //cpassando o controller como parametro da função, pois é ele que irá lidar com o req e o res

module.exports = route; //exportando o route para que possamos utilizar em outro arquivo