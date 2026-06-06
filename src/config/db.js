import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const MongoDb = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`Connect to MongoDB !! Host :  ${MongoDb.connection.host}`);
    } catch (error) {
        console.error('Error to Connect DB... ',error);
        process.exit(1);
    }
}

export default connectDB;