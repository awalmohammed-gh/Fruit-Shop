import mongoose from "mongoose";
import dns from "dns"

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDb = async () =>{
    try {
        mongoose.connection.on("connected",()=>{
            console.log("Mongo database is connected");
        })

      await mongoose.connect(`${process.env.MONGODB_LINK}/fruitShop_db`);
    } catch (error) {
        console.log("Error connecting to Mongo database", error);
    }
}

export default connectDb;