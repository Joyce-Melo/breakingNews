import dotenv from 'dotenv'
import jwt from "jsonwebtoken";
import userService from '../services/user.service.js';

dotenv.config();

export const authMiddleware = (req, res, next) => {
    try{
        const { authorization } = req.headers; //aqui sempre será com a minusculo
        if(!authorization){
            return res.sendStatus(401);
        }

        const parts = authorization.split(" "); //Separando o que está dentro do authorization por espaço, pois assim conseguimos verificar se há a palavra bearer que é obrigatória
        
        if(parts.lenght > 2 || parts.lenght < 2 ){ //nosso parts sempre será 2, caso não seja 2 está errado. Ps: no código original a validação estava como parts.lengh !== de 2, mas por algum motivo estava dando erro, então mudei a validação         
            return res.sendStatus(401);
        }

        const [schema, token] = parts //desestruturando um array (nosso authorization, lembrando que uma string é um array de caracteres)

        if(schema !== "Bearer"){ //verificando se a primeira posição de authorization é o bearer
            return res.sendStatus(401);
        }

        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => { //no options colocamos uma arrow function para nos retornar um erro e um decoded
        //Como nosso token foi criado através do jwt, usaremos o jwt para verifica-lo
        //Usamos essa função verify, que recebe 3 parametros, o token que vai ser verificada, o nosso secret, e alguma/algumas option            
            if(error){
                return res.status(401).send({message:"Token invalid"});
            }
            const user = await userService.findByIdService(decoded.id); //verificando se o id que foi passado é válido, essa verificação está sendo feita pelo user.Service
            


        if(!user || !user.id){
            return res.status(401).send({message: "Invalid token!"});
        }

        //Porém antes de enviar o ID, quero verificar se esse user existe, se é um user válido
        //como procuro um usuárioo? Temos um fundById no service do user
        req.userId = user.id; //pegando o id do user//esse req.id saí do meu middleware de user
       
       return next();
    });

        

    
    
        
    }catch(error){
        res.status(500).send(error.message);
    }
}