import News from "../models/News.js";

export const createService = (body) => News.create(body);

export const findAllService = (offset, limit) =>
  News.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user"); //1º quero trazer de trás pra frente, ou seja, a última noticia postada é a primeira que tem que aparecer
//_id: -1 = ordena pelo último id criado até o primeiro (forma de ordenar do mongoDB)
//skip - de quantos em quantos eu vou pular, que no nosso caso é o offset, começo do 0 e trago 5, depois começo do 5 e trago mais 5 e por aí vai, sempre vai somando o limite
//Como estou exportando desconstruído não consigo dar um export default, tenho que usar apenas o export, ou exportar cada uma das const

export const countNewsService = () => News.countDocuments(); //countdocuments é uma função do mongoose que conta quantos documentos temos ali no db

export const topNewsService = () =>
  News.findOne().sort({ _id: -1 }).populate("user"); //Se eu não passar nada no findOne ele retornará o primeiro item da lista, como estou fazendo sort_id-1 o primeiro item é o mais recente

export const findByIdService = (id) => News.findById(id).populate("user");

export const searchByTitleService = (title) =>
  News.find({
    title: { $regex: `${title || ""}`, $options: "i" }, //para usarmos um comando especifico dentro do mongodb usamos o $, estamos usando o regex do próprio mongo
  }) //${title || ""} isso significa que ele pode manda o title completo ou parte dele
    .sort({ _id: -1 }) //Criar o regex aqui no service ao invés do controller pode aumentar a velocidade da nossa busca no banco
    .populate("user"); //$options: "i" essas option é para determinarmos se há a diferenciação de maiusculo e minusculo, no nosso caso não, então colocamos i de case insensitive

export const byUserService = (id) =>
  News.find({ user: id }).sort({ _id: -1 }).populate("user"); //nosso user na model de news é o objectId

export const updateService = (id, title, text, banner) =>
  News.findOneAndUpdate(
    { _id: id },
    { title, text, banner },
    { rawResult: true }
  ); //faremos update por postagem, não vamos atualizar tudo de uma vez, pois isso é o famoso update sem where, se vc não falar o que quer atualizar, todo o banco será atualizado e isso pode dar problema
//A função do mongoose para atualizar é o findOneAndUpdate, que recebe 2 parametros, o primeiro qual dado quero atualizar, e o segundo o que eu qro atualizar, no nosso caso qro atualizar um dado segundo o id
//RawResult: true -> para que ele mostre o item depois de atualizado

export const eraseService = (id) => News.findByIdAndDelete({ _id: id });

export const likeNewsService = (idNews, userId) =>
  News.findOneAndUpdate(
    { _id: idNews, "likes.userId": { $nin: [userId] } },
    { $push: { likes: { userId, created: new Date() } } }
  ); //O que vou atualizar é o array de likes, recebo dois parametros que são objetos, o 1º - Qual que é o documento (que saberemos através do id), e o que quero fazer, no nosso caso incrementar o array, em js fazemos isso usando o push, e no mongo também, porém no mongo temos que colocar o "$" e fica assim: $push para indicar query, especificamos também em qual campo iremos fazer esse push
//Que no nosso caso é o like e passamos um objeto dentro dele, onde colocamos o userId que é quem está dando o like e quando aquilo foi feito
// "likes.userId" : {$nin: [userId] estou fazendo um filtro, dentro dessa noticia que eu achei, vai no campos likes, procura nesse array o campo userId, se ele encontrar um userId for o mesmo do userId que está tentando dar o like novamente nessa msm noticia, ele retorna um erro (nin = not in)

export const deleteLikeNewsService = (idNews, userId) =>
  News.findOneAndUpdate({ _id: idNews }, { $pull: { likes: { userId } } });
//pull para retirar

export const addCommentService = (idNews, comments, userId) => {
  const idComment = Math.floor(Date.now() * Math.random()).toString(36); //aqui nós estamos criando um id aleatório, estou pegando a data do dia, multiplicando por um numero aletório, arredondando para não ficar quebrado e transformando em uma string com 36 caracteres

  return News.findOneAndUpdate(
    //como estamos em bloco precisamos adicionar o return, então nossa função irá retornar o que vier aqui desse update
    { _id: idNews }, //estamos buscando o id
    {
      $push: {
        //fazendo o push em comments
        comments: { idComment, userId, comments, createdAt: new Date() },
      }, //estou colocando em cd comentário o id do comment, um userid e o proprio comentário e terei o created at
    }
  );
};
//Cada comentário precisará de um ID, pois um msm usuário poderá fazer vários comentários, então temos que criar um, por esse motivo,
//não conseguiremos deixar essa função inline, teremos que fazer uma função em bloco, pois antes de adicionar de fato um comentário, temos que cirar um id pra ele

export const deleteCommentService = (idNews, idComment, userId) =>
  News.findOneAndUpdate(
    { _id: idNews },
    { $pull: { comments: { idComment, userId } } } //Estou filtrando pelo id do comentário e pelo id do usuário, apenas o usuário que criou o comentário é capaz de apagar ele
  );
