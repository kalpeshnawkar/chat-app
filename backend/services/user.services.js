const user = require('../app/model/user');

exports.register = (data,callback) => {
    console.log('req body in services ==',data);

    user.save(data,(err,result) => {
        if(err){
            callback(err);
        }
        else
        {
            return callback(null,result);
        }
    })

}
exports.login=(data,callback)=>{
    console.log('req body in services11 ==',data);
    user.find(data,(err,result)=>{
        console.log(result);
        
        if(err){
            console.log("24==service ",data)
            callback(err);
        }
        else
        {
            console.log("28==service ",data)
            return callback(null,result);

        }
    })
}
exports.forgot=(data,callback)=>{
    
    user.forgotemail(data,(err,result)=>{
        console.log(data);
        
        if(err){
            
            callback(err);
        }
        else
        {
        
             callback(null,result);
        }
    })
}


exports.reset=(data,callback)=>{
    console.log('req body in services53 ==',data);
    user.resetPassword(data,(err,result)=>{
        console.log(data);
        
        if(err){
            console.log("24==service ",data)
            callback(err);
        }
        else
        {
            console.log("28==service ",data)
            return callback(null,result);

        }
    })
}
exports.getAllUsers=(callback)=>{
    user.getAllUsers((err,result)=>{
        
        
        if(err){
            callback(err);
        }
        else
        {
            return callback(null,result);

        }
    })
}