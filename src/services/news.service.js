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
