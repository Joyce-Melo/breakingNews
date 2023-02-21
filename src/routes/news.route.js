import { Router } from "express";
const router = Router();

import { create, findAll, topNews, findById } from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topNews);
router.get("/:id", findById)//:id - parametro que pasamos para rota, para que consigamos capturar esse parametro no controller e buscar no service o dado especifico


export default router;