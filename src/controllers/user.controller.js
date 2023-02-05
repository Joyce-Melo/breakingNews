const userService = require('../services/user.service')

const create = async (req, res) => {
    const {name, username, email, password, avatar, background}= req.body;

    if(!name || !username || !email || !password || !avatar || !background){
        res.status(400).send({message:"Submit all fields for registration"})
    }

    const user = await userService.create(req.body) //usando o método create nosso userservice e passando o req.body pra ele, await = espera finalizar a execução para só depois continuar

    if(!user) { //caso ele não consiga criar o user, retorna o erro abaixo
        return res.status(400).send({message: "Error creating User"})
    }

    res.status(201).send({
        message: "User created succesfully",
        user: {
            id: user._id, //_id pq é dessa forma que é criado no MongoDB por padrão
            name,
            username,
            email,
            avatar,
            background,
        }
       
    })
}


module.exports = { create }