import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
    tittle: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    },
    banner: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now() //Em js essa função pega a data atual
    },
    //Em uma modelagem de dados esses carinhas abaixo devem ser outra tabela
    //Nós vamos fazer o relacionamente com o mongoose, e podemos fazer isso de duas formas
    //Com relacionamento atrvés de objectID ou através de array
    user:{
        type: mongoose.Schema.Types.ObjectId, //relacionando ao objectId
        ref: "User", //usando como referencia nossa tabela User, e esse nome deve ser obrigatóriamente o mesmo que nós exportamos
        required: true, // toda postagem tem que estar relacionada a algum usuário 
    }, //Esse já é da nossa tabela user
    likes:{
        type: Array,
        require: true
    },
    comments:{
        type: Array,
        require: true
    },

})

const News = mongoose.model("News", NewsSchema)

export default News;