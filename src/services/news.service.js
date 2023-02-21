import News from "../models/News.js";

const createService = (body) => News.create(body);

const findAllService = (offset, limit) => News.find().sort({_id: -1}).skip(offset).limit(limit).populate("user"); //1º quero trazer de trás pra frente, ou seja, a última noticia postada é a primeira que tem que aparecer
//_id: -1 = ordena pelo último id criado até o primeiro (forma de ordenar do mongoDB)
//skip - de quantos em quantos eu vou pular, que no nosso caso é o offset, começo do 0 e trago 5, depois começo do 5 e trago mais 5 e por aí vai, sempre vai somando o limite
//Como estou exportando desconstruído não consigo dar um export default, tenho que usar apenas o export, ou exportar cada uma das const

const countNewsService = () => News.countDocuments(); //countdocuments é uma função do mongoose que conta quantos documentos temos ali no db


export {
    createService,
    findAllService,
    countNewsService
}

