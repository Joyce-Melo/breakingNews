import { Router } from "express";
const router = Router();

import swaggerUi from "swagger-ui-express"
import swaggerDocument from "../swagger.json" assert {type: "json"}; //esse é um arquivo que eu criei na raiz do nosso projeto, e lá colocaremos as expecificações do nosso projeto e o swagger ui irá rodar isso através de uma interface gráfica

//precisamos puxar o swagger lá no index tb
router.use("/", swaggerUi.serve); //estou falando para a rota utilizar isso aqui, cria um servidorzinho para o swagger
router.get("/", swaggerUi.setup(swaggerDocument))

export default router;