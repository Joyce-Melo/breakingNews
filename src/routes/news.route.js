import { Router } from "express";
const router = Router();

import { create, findAll, topNews, findById, searchByTitle, byUser, update } from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topNews);
router.get("/search", searchByTitle)
router.get("/byUser", authMiddleware, byUser) //aqui eu não vou precisar passar o parametro id, pq só vai conseguir fazer essa busca quem está logado, para autenticação de quem está logado usamos o authmiddleware que já trás no token o id, então não há necessidade de passar o msm
router.get("/:id", authMiddleware, findById)//:id - parametro que pasamos para rota, para que consigamos capturar esse parametro no controller e buscar no service o dado especifico
//quando passamos um parametro o ideal é deixá-lo por último pois pode dar erro, o express pode se perder (bug do express)
router.patch("/:id", authMiddleware, update)



export default router;