import { Router } from "express";
const router = Router();

import {
  create,
  findAll,
  topNews,
  findById,
  searchByTitle,
  byUser,
  update,
  erase,
  likeNews,
  addComment,
  deleteComment,
} from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topNews);
router.get("/search", searchByTitle);
router.get("/byUser", authMiddleware, byUser); //aqui eu não vou precisar passar o parametro id, pq só vai conseguir fazer essa busca quem está logado, para autenticação de quem está logado usamos o authmiddleware que já trás no token o id, então não há necessidade de passar o msm
router.get("/:id", authMiddleware, findById); //:id - parametro que pasamos para rota, para que consigamos capturar esse parametro no controller e buscar no service o dado especifico
//quando passamos um parametro o ideal é deixá-lo por último pois pode dar erro, o express pode se perder (bug do express)
router.patch("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, erase); //não podemos usar a palavra delete como nome da nossa função pois delete é uma palavra reservada do express
router.patch("/like/:id", authMiddleware, likeNews); //Não dou um like em várias noticias ao msm tempo, é sempre uma por vez, então tenho que saber em qual noticia estou dando esse like, patch pq estarei alterando o array dos likes, ele começará com zero e conforme for ganhando likes esses array será incrementado
router.patch("/comment/:id", authMiddleware, addComment);
router.patch("/comment/:idNews/:idComment", authMiddleware, deleteComment); //Aqui é a rota de apagar um comentário, então pq não estamos usando o delete? Bom, nós não queremos apagar o documento, nós iremos apenas alterar o documento, eu vou tirar um comentário do documento

export default router;
