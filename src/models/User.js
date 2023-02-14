import mongoose from 'mongoose'; //Estamos importando pois aqui iremos criar uma Schema, que serve basicamente para limitarmos como os documentos serão criados

const UserSchema = new mongoose.Schema({  //.Schema é um método do mongoose, então criamos um objeto com os campos, cada campo será um objeto e cada um deles tem a definição (config) daquele campos
    name: {
        type: String,
        required: true, //obrigatorio
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, //unico
    },
    password: {
        type: String,
        required: true,
    },
    avatar:{
        type: String,
        required: true,
    },
    background:{
        type: String,
        required: true,
    }
});

const User = mongoose.model("User", UserSchema); //Atribuindo nosso schema a uma const para podermos exporta-lo ("nomeQueVamosDarAoSchema", schemaEmSi), no mongoose.model estamos indicando que isso é um modelo do nosso schema

export default User; //exportando nosso schema

