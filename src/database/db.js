const mongoose = require('mongoose');

const connectDatabase = () => { //É aqui que faremos a conexão
    console.log("Wait connectiong to the database")

    mongoose.connect("mongodb+srv://root:Monguinho33@cluster0.h5uwesr.mongodb.net/?retryWrites=true&w=majority", 
    {useNewUrlParser : true, useUnifiedTopology: true} //O mongoose.connect espera por 2 paramentros, uma uri(que é uma sting) e outra options

    )
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch((error) => console.log(error))
};

module.exports = connectDatabase;