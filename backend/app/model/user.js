const mongoose = require('mongoose'); //ODM(object document Mapper) framework for MongoDB
const bcrypt = require('bcrypt');
 const saltRounds = 10;
var UserSchema = new mongoose.Schema({
    firstname : {
        type : String,
        required:true
    },
    lastname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        unique:true
    },
    password : {
        type : String,
        required : true
    },
},{
    timestamps:true
}

)

var user = mongoose.model('user',UserSchema);

function user_model(){

}
function hash(password) {
    var hashpassword = bcrypt.hashSync(password, saltRounds);
    return hashpassword;
}


user_model.prototype.save = ((data,callback) => {
    console.log('req body in model ==',data);
    

    
    user.findOne({"email":data.email},(err,result)=>{
    if(err)
    {
        callback(err);
    }
    else
    {
        if(result!==null)
        callback('Username already registered');
        else 
        {
            const user_data=new user({"firstname":data.firstname,
            "lastname":data.lastname,
            "email":data.email,
            "password":hash(data.password)

                
                });
            user_data.save((err,result) => {
            if(err){
            callback(err);
            }
            else
            {
                return callback(null,result);
            }
            }) 
        }
    }
        
    })  
})

user_model.prototype.find =((body,callback) => {
    
   
    
    user.findOne({"email" :body.email},(err,data)=>{

        if(err){
            callback(err);
        }
        else if (data != null) 
        {
        
            bcrypt.compare(body.password, data.password).then(function (res) {
                console.log(res);
                
                if(res) {
                    console.log("login succesfully");
                    callback(null, res);
                } else {
                    console.log("Incorrect password");
                    callback("Incorrect password");
                }
            });
        }
    
        else{
            console.log("Invalid user");
            callback("invalid user");
        }
    })
})


user_model.prototype.forgotemail =((data,callback) => {
    
    user.findOne({"email" :data.email},(err,result)=>{
        if(err){
            callback(err);
        }
        else
        {
             callback(null,result);
        }
    })
})

user_model.prototype.resetPassword =((body,callback) => {
    console.log("before==112",body.password);
    var newPassword = bcrypt.hashSync(body.password, saltRounds);
    
    user.updateOne({password:newPassword},(err,data)=>{

        if(err){
            callback(err);
        }
        else{
            console.log("Reseted your password");
            return callback(null,data);
        }
    })
})

user_model.prototype.getAllUsers = ((callback) => {
    
    user.find({ },(err,result)=>{
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


module.exports = new user_model;
