const mongoose=require('mongoose');

const connectDB=async()=>{
    // console.log(process.env.MONGO_URI);
    try{
        const conn=await mongoose.connect("mongodb+srv://anuskamitra2001:resumeBuilder@cluster0.0vgpzbc.mongodb.net/?retryWrites=true&w=majority",{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log(`MongoDB connect: ${conn.connection.host}`)
    }catch(error){
        console.log(`error :${error}`);
        process.exit();
    }
}
module.exports=connectDB;