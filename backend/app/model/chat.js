const mongoose = require('mongoose'); //ODM(object document Mapper) framework for MongoDB
var UserSchema = new mongoose.Schema({
    senderID: {
        type : String,
        
    },
    receiverID: {
        type : String,
    
    },
    message : {
        type : String,
        
    },

},{
    timestamps:true
}

)

var chat = mongoose.model('chatInfo',UserSchema);

function chat_model(){

}

chat_model.prototype.save = ((data,callback) => {
    console.log('req body in model ==',data);
            const chat_data=new chat({
                 
            "senderID":data.senderID,
            "receiverID":data.receiverID,
            "message":data.message,
});
            chat_data.save((err,result) => {
            if(err){
            callback(err);
            }
            else
            {
                
                console.log("sdhfsdfg",result);
                
                return callback(null,result);
            }
            }) 
        })
        
chat_model.prototype.getAllUsersChat = ((callback) => {
    
    chat.find({ },(err,result)=>{
    if(err)
    {
        callback(err);
    }
    else
    {

        callback(null,result)
    }
})
})

    
        

        module.exports = new chat_model;
