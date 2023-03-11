import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json" assert { type: 'json' }
const router = Router();

//precisamos puxar o swagger lá no index tb
router.use("/", swaggerUi.serve); //estou falando para a rota utilizar isso aqui, cria um servidorzinho para o swagger
router.get("/", swaggerUi.setup(swaggerDocument))

export default router;