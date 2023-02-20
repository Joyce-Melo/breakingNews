import News from "../models/News.js";

const createService = (body) => News.create(body);

const findAllService = () => News.find()


//Como estou exportando desconstruído não consigo dar um export default, tenho que usar apenas o export, ou exportar cada uma das const
export {
    createService,
    findAllService
}

