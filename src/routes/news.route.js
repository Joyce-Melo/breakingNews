import { Router } from "express";
const router = Router();

import { create, findAll, topNews, findById, searchByTitle } from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topNews);
router.get("/search", searchByTitle)

router.get("/:id", authMiddleware, findById)//:id - parametro que pasamos para rota, para que consigamos capturar esse parametro no controller e buscar no service o dado especifico
//quando passamos um parametro o ideal é deixá-lo por último pois pode dar erro, o express pode se perder (bug do express)
export default router;