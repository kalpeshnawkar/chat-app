const chat=require('../app/model/chat')
exports.message = (data,callback) => {
    console.log('req body in services ==',data);

    chat.save(data,(err,result) => {
        if(err){
            callback(err);
        }
        else
        {
            console.log("wewq",result);
            
            return callback(null,result);
        }
    })

}

exports.getAllUsersChat=(callback)=>{
    chat.getAllUsersChat((err,result)=>{
        
        
        if(err){
            callback(err);
        }
        else
        {
            return callback(null,result);

        }
    })
}