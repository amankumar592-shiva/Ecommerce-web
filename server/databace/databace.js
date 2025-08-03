import mongoose from "mongoose";
import colors from "colors";


const connectDB = async() => {

    try{ 
        console.log('Mongo URI:', process.env.MONGO_URI);

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(
            `CONNECTED to mongoDB Databace ${conn.connection.host}`.bgMagenta.white
        );

    }catch(error){ 
        console.log(`error in mongoDb ${error}`.bgRed.white)
    }
}
   
 export default connectDB;