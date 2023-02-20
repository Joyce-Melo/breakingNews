import User from "../models/User.js"
import jwt from "jsonwebtoken";

const loginService = (email) => User.findOne({email: email}).select("+password") //Quando coloco {} dentro de um findOne, é um fintro que estou adicionando
//Então aqui estou procurando no campo email o email que eu recebi para essa função (que é o que está sendo passado no auth.controlleer.js)
//Esse .select(+password) é para ele retornar também o password, o select é aquela propriedade que deixamos como false na nossa model


const generateToken = (id) => jwt.sign({id: id}, process.env.SECRET_JWT, {expiresIn: 864000})//Token para guardar a sessão do usuário, e o nosso front/cliente saber qual é o usuário que está nessa sessão. Porém não posso expor os dados do meu usuário

//O jwt.sign pede três argumentos, o 1º é o payload que é qual é o dado do meu usário que quero criptografar e adicionar dentro dessa chave json, no nosso caso será o id
//2º secret or private key, usaremos o secret e essa chave pode ser qualquer coisa, mais ela será responsável por decodificar esse jsonwebtoken, então iremos criar uma chave MD5 (procure por generate md5 no google e gere uma)
//3º options - algumas configs que você pode fazer na hora de criar esse jwt, no nosso caso colocaremos o tempo de expiração, depois de quanto tempo nosso jwt deixa de ser válido e que precisamos criar outro com as msms infos, usamos o expiresIn que é utilizado com segundos

export {loginService, generateToken};