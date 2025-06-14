import mongoose from "mongoose";

export const db = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL); 
        console.log("DataBase is connected");
    }catch(error){
        console.log("db Error", error)
        console.error("❌ MongoDB connection error:", error.message);
    }
}