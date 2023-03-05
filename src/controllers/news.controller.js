import {
  createService,
  findAllService,
  countNewsService,
  topNewsService,
  findByIdService,
  searchByTitleService,
  byUserService,
  updateService,
  eraseService,
  likeNewsService,
  deleteLikeNewsService,
  addCommentService,
  deleteCommentService,
} from "../services/news.service.js";

const create = async (req, res) => {
  try {
    //Como faço para pegar o id do user no login? No auth.service usamos o id como um dos componenetes para criar o token, e ao final do login no auth.controller nós retornamos o token, então para sabermos qual id está conectado nós utilizamos esse token que foi retornado
    const { title, text, banner } = req.body;

    if (!title || !banner || !text) {
      res.status(400).send({
        message: "Submit all fields for registration",
      });
    }

    await createService({
      //o createService espera pelo body e estou mandando ele desconstruido
      title,
      text,
      banner,
      user: req.userId, //agora conseguimos mandar o que vem do decoded id lá do middleware
    });

    res.send(201);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findAll = async (req, res) => {
  try {
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      //lembrando que um queryparams é opcional, então aqui estamos setando um valor padrão para o caso de não ser enviado nada
      limit = 5;
    }
    if (!offset) {
      offset = 0; //offset é "da onde eu começo", na primeira vez começo de zero e mostro 5(primeira pag), da segunda vez começo do 5 e coloco 5 (segunda pag) e assim por diante
    }

    const news = await findAllService(offset, limit); //passando então o offset e o limit para nosso db, pois não queremos que ele busque absolutamente tudo de uma vez no db, pois quanto mais dados mais lento, assim conseguimos paginar o db também
    const total = await countNewsService(); //esse total é o total de noticias que tenho no nosos banco
    const currentUrl = req.baseUrl; //baseUrl vem do header e é o url que fez a requisição, isso é padrão
    console.log(currentUrl);

    //mais para frente
    const next = offset + limit; //isso acontecerá sempre que uma requisição for feita
    const nextUrl =
      next < total ? `${currentUrl}?limit${limit}&offset=${next}` : null;
    //Aqui estou criando uma nova url com os novos limits e offset

    //voltando
    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit${limit}&offset=${previous}`
        : null;

    if (news.lenght === 0) {
      return res.status(400).send({ message: "There are no registered news" });
    }
    res.send({
      //esse retorno é para o front e ele precisará de todas essas infos
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,

      results: news.map((newsItem) => ({
        //map retorna um array, então ele vai varrer esse array de news e retornará um novo array com as infos abaixo
        id: newsItem._id,
        title: newsItem.title,
        text: newsItem.text,
        banner: newsItem.banner,
        likes: newsItem.likes,
        comments: newsItem.comments,
        name: newsItem.user.name, //.user pq estamos pegando do objeto user
        userName: newsItem.user.username,
        userAvatar: newsItem.user.avatar,
      })),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const topNews = async (req, res) => {
  try {
    const news = await topNewsService();

    if (!news) {
      return res.status(400).send({ message: "There is no registered post" });
    }

    res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name, //.user pq estamos pegando do objeto user
        userName: news.user.username,
        userAvatar: news.user.avatar,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params; //Esse id é o msm nome que colocamos na rota

    const news = await findByIdService(id);

    return res.send({
      news: {
        id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        name: news.user.name, //.user pq estamos pegando do objeto user
        userName: news.user.username,
        userAvatar: news.user.avatar,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    const news = await searchByTitleService(title);

    if (news.lenght === 0) {
      return res
        .status(400)
        .send({ message: "There are no news with this title" });
    }
    //o find (que está em searchByTittleService) sempre retorna um array, então temos que retornar um array, por isso usamos o map
    return res.send({
      results: news.map((newsItem) => ({
        //map retorna um array, então ele vai varrer esse array de news e retornará um novo array com as infos abaixo
        id: newsItem._id,
        title: newsItem.title,
        text: newsItem.text,
        banner: newsItem.banner,
        likes: newsItem.likes,
        comments: newsItem.comments,
        name: newsItem.user.name, //.user pq estamos pegando do objeto user
        userName: newsItem.user.username,
        userAvatar: newsItem.user.avatar,
      })),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const byUser = async (req, res) => {
  try {
    const id = req.userId; //variável do middleware de autenticação, onde pego o id do token, e eu tenho accesso a ela, pq na rota, antes de vir para cá eu passo por essa middleware de autenticação
    const news = await byUserService(id);

    return res.send({
      results: news.map((newsItem) => ({
        //map retorna um array, então ele vai varrer esse array de news e retornará um novo array com as infos abaixo
        id: newsItem._id,
        title: newsItem.title,
        text: newsItem.text,
        banner: newsItem.banner,
        likes: newsItem.likes,
        comments: newsItem.comments,
        name: newsItem.user.name, //.user pq estamos pegando do objeto user
        userName: newsItem.user.username,
        userAvatar: newsItem.user.avatar,
      })),
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { title, text, banner } = req.body;
    const { id } = req.params; //id da postagem que qro atualizar

    if (!title && !banner && !text) {
      res.status(400).send({
        message: "Submit at least one field for update",
      });
    }

    const news = await findByIdService(id); //procurando a news

    if (news.user._id != req.userId) {
      //req.userId é o id de quem está logado, e só poderá fazer a atualização quem estiver logado, ps: vem do middleware
      return res.status(400).send({
        message: "You can not update this post",
      });
    }

    await updateService(id, title, text, banner); //O que estou passando são os parametros então precisam estar na msm rdem de que foi pedida no service

    return res.send({ message: "Post succesfully updated" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const erase = async (req, res) => {
  try {
    const { id } = req.params; //id da postagem que qro atualizar

    const news = await findByIdService(id); //procurando a news

    if (news.user._id != req.userId) {
      //req.userId é o id de quem está logado, e só poderá fazer a atualização quem estiver logado, ps: vem do middleware
      return res.status(400).send({
        message: "You can not delete this post",
      });
    }

    await eraseService(id);

    return res.send({ message: "Post succesfully deleted" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const likeNews = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId; //id de quem está fazendo o like

    const newsLiked = await likeNewsService(id, userId);

    if (!newsLiked) {
      //quando ele vê que a pessoa já deu um like naquela postagem, ele interpreta como null, null e js é falsy, então o que podemos fazer aqui é uma validação, quando uma pessoa que já deu um like naquele post tentar dar um like novamente ele descurti a postagem, ou seja, nós removemos aquele like
      await deleteLikeNewsService(id, userId);
      return res.status(200).send({ message: "Like succesfully removed" });
    }

    res.send({ message: "Like done succesfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { comments } = req.body; //Assim com o {} eu envio apenas o campo comment, se eu colocar sem o {} eu envio o objeto comment "comment": "conteúdoDoComment", isso tudo é o objeto, como quero só o "conteúdoDoComment" envio desconstruído

    if (!comments) {
      return res.status(400).send({ message: "Write a message to comment" });
    }

    await addCommentService(id, comments, userId);

    res.send({
      message: "Comment succesfully completed!",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { idNews, idComment } = req.params;
    const userId = req.userId;

    const commentDeleted = await deleteCommentService(
      idNews,
      idComment,
      userId
    );

    console.log(commentDeleted); //Usamos esse console.log para ver o que está sendo retornado quando deletemaos um comentário, vimos que ele retorna um objeto
    //Nesse objeto há o userId, então iremos usar isso para fazer o validação a baixo, assim conseguiremos saber se quem está tentando apagar o comentário é o dono do comentário


    const commentFinder = commentDeleted.comments.find(comment => comment.idComment === idComment) //procura pelo comentário que tem o msm idcomment que estamos passando na rota

      if(!commentFinder){
        return res.status(404).send({ message: "Comment not found" });
      }
  

    if (commentFinder.userId !== userId) {
      //verifica se o usuário do comentário é diferente do que está logado
      return res.status(400).send({ message: "You can't delete this comment" });
    }

    res.send({
      message: "Comment succesfully deleted!",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export {
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
};
