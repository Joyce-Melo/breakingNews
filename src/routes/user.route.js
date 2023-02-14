import express from "express";
import userController from '../controllers/user.controller.js'; //importando o controlle
import { validId, validUser } from '../middlewares/global.middlewares.js';

const route = express.Router();


// const { validId, valiseUser} = require("../middlewares/global.middlewares");
//Importando nossos middleware, agora colocarei onde quero usá-los

route.post("/", userController.create ) //cpassando o controller como parametro da função, pois é ele que irá lidar com o req e o res
route.get("/", userController.findAll ); //buscando todos os usuários
route.get("/:id", validId, validUser, userController.findById) //buscando um usuário com um ID especifico, os : representa que é um parametro, o id é o nome que eu dei para o parametro
route.patch("/:id", validId, validUser, userController.update)


export default route //exportando o route para que possamos utilizar em outro arquivo