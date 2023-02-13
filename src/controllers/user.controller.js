const userService = require('../services/user.service')

const create = async (req, res) => {
   try { 
    const {name, username, email, password, avatar, background}= req.body;

    if(!name || !username || !email || !password || !avatar || !background){
        res.status(400).send({message:"Submit all fields for registration"})
    }

    const user = await userService.createService(req.body) 

    if(!user) { 
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
       
    }) //Ele só não consiguirá fazer isso acima, se houver um erro de servidor, então no catch mando o erro de servidor
} catch(err) {
    res.status(500).send({messaage: err.messaage}) //mando então a mensagem de erro
}
};

const findAll = async (req, res) =>{ 
      try { 
        const users = await userService.findAllService(); 

        if(users.lenght === 0){
            return res.status(400).send({message: "There are no registered users"});
        }

        res.send(users) 
    } catch (err){
        res.status(500).send({message: err.message})
    }

}

const findById = async (req, res) =>{
    try{
        const user = req.user;

    res.send(user)
} catch (err){
    res.status(500).send({message: err.message})
}

}

const update = async(req, res) => {
    //Pegando as infos do body da requisição
    try {
        const {name, username, email, password, avatar, background}= req.body; 

    //Verificando se há pelo menos 1 item para a atualização
    if(!name && !username && !email && !password && !avatar && !background){
        res.status(400).send({message:"Submit at least one field for update"})
    }

    const {id, user} = req;
    

    await userService.updateService(
      id,
      name, 
      username, 
      email, 
      password, 
      avatar, 
      background,
    );

    res.send({message: "User succesfully updated!"})
} catch (err){
    res.status(500).send({message: err.message})
}
}


module.exports = { create, findAll, findById, update }