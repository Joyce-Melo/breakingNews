const router = require("express").Router();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

//precisamos puxar o swagger lá no index tb
router.use("/", swaggerUi.serve); //estou falando para a rota utilizar isso aqui, cria um servidorzinho para o swagger
router.get("/", swaggerUi.setup(swaggerDocument))

module.exports = router;