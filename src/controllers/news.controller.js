import { createService, findAllService} from "../services/news.service.js";



const create = async (req, res) => {
    try{ //Como faço para pegar o id do user no login? No auth.service usamos o id como um dos componenetes para criar o token, e ao final do login no auth.controller nós retornamos o token, então para sabermos qual id está conectado nós utilizamos esse token que foi retornado

        const {title, text, banner} = req.body;

        if(!title || !banner || !text) {
            res.status(400).send({
                message: "Submit all fields for registration",
            });
        }

        await createService({ //o createService espera pelo body e estou mandando ele desconstruido
            title,
            text,
            banner,
            id: 'objectidfake1',

        })

        res.send(201);
    } catch(error){
        res.status(500).send({message: error.message});
    }

   
}

const findAll = (req, res) => {
    const news = [];
    res.send(news);
}

export {
    create,
    findAll,
}