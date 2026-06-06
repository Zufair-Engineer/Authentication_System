import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,"Name must be Required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true,"Email must be Required"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true,"Password must be Required"],
        unique: true,
        trim: true
    }
},{timestamp: true})

const User = mongoose.model('User',userSchema);
export default User;