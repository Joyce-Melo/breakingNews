import bcrypt from 'bcryptjs'
import { loginService, generateToken } from '../services/auth.service.js';


const login = async (req,res) => {
    const {email, password} = req.body; //Tudo que recebemos através de formulário, recebemos por um body, irá chegar no backend como body
    
    try{
        const user = await loginService(email);

        if(!user){
            return res.status(404).send({message: "User or password not found"})
        } //colocamos a mesma msg de user e senha not found nas duas validações pois é mais seguro que não se saiba o que está errado

        const passwordIsValid = bcrypt.compareSync(password, user.password) //Aqui por debaixo dos panos ele irá pegar o password que recebeu o body, irá incripta-ló e então irá comparar com o password incriptado desse usuário que já existe no banco
        //compareSync para ele comparar de forma sincrona, se formos usar apenas o campare temos que obrigatóriamente colocar o await na frente de bcrypt -> await brcypt.compare()
        
        if(!passwordIsValid){
            return res.status(400).send({message: "User or password not found"})
        }

        const token = generateToken(user.id)

        res.send({token});
    } catch (error){
        res.status(500).send(error.message);
    }

};

export { login };