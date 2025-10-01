
import mongoose from "mongoose";

const connectDB= async ()=>
{
    try {
        await mongoose.connect(process.env.DB_URL,{
            dbName:"MyCareer"
        })
        console.log("Mongodb is connected");
        
    } catch (error) {
        console.error(error);
        
    }
}
export default connectDB