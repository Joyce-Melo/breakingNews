import { Router } from "express" //Trazendo diretamente o Router do express, diferentemente do user.route que trouxemos todo o express e do express puxamos o router
const router = Router(); //executando o router

import { login } from "../controllers/auth.controller.js"; //como tenho apenas uma função dentro desse nosso controller eu desestruturei tanto o export lá, mandando apenas o login, quanto o import aqui, puxando apenas o login, clean code

router.post("/", login) //autenticação normalmente fazemos com post, função login do controller

export default router;