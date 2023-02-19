import mongoose from 'mongoose';

const connectDatabase = () => { //É aqui que faremos a conexão
    console.log("Wait connectiong to the database")
    
    mongoose
    .connect( process.env.MONGODB_URI, 
    {useNewUrlParser : true, useUnifiedTopology: true} //O mongoose.connect espera por 2 paramentros, uma uri(que é uma sting) e outra options

    )
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch((error) => console.log(`Error connecting to MongoDB Atlas: ${error}`))
};

export default connectDatabase;

