import mongoose from "mongoose";
 
let isConnected = false;

export default async function connectToDB() {
    mongoose.set('strictQuery', true);
    
    if (isConnected) {
        console.log("Already connected to DB");
        return ;
    }
    try {
        const database = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompts",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected = true;
        console.log("Connected MongoDB");
    } catch (error) {
        console.log(error)
    }
}