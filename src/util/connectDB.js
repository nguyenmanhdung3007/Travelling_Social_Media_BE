const mongoose = require('mongoose');
const connection= async(req,res)=>{
    try{
        const conn = await mongoose.connect(`mongodb+srv://tukhanhlinh12:linh2003@cluster0.ngwfoo7.mongodb.net/travelsocialnetwork?retryWrites=true`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("ket noi db thanh cong ")
    }catch(err){
         console.log(err);
    }
}

module.exports=connection;
