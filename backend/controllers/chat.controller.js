const    chat_services=require("../services/chatServices")
exports.message = (req,callback) => {
    
    
    chat_services.message(req,(err, result) => {
        console.log('req body in ctrl ==',req);
        console.log("Data",result);
    
        if(err){
        callback(err) 
        }
        else{
            console.log("dsafresa",result);
            
            return callback(null,result)
        }
    });
    
}

exports.getAllUsersChat= (req,res) => {
    
    var res_result = {};

    chat_services.getAllUsersChat((err,result) => {
        
        if(err){
            
            res_result.status = false;
            res_result.message = err;
            res.status(400).send(res_result);
        }
        else
        {
            res_result.status = true;
            res_result.data = result;
            res.status(200).send(res_result);
        }
    })
    
}