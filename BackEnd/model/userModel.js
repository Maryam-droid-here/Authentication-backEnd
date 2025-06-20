import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        unique: true,
    },

    email:{
        type: String,
        required: true,
    },

    password:{
        type: String,
        required: true,
    }

}, {timestamps: true});

export default mongoose.model("user", userSchema);