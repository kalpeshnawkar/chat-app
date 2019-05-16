const user_services = require('../services/user.services');
const generateToken=require('../middleware/genrateToken')
const sendMail=require('../middleware/sendMailer')
exports.register = (req,res) => {
    
    var res_result = {};
    if(req.body == null){
       
        res_result.status = false;
        res_result.message = 'Field is empty';
        res.status(404).send(res_result);
    }

    user_services.register(req.body,(err,result) => {
        console.log('req body in ctrl ==',req.body);
        
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

exports.login=(req,res)=>{
    var pass_res={};
    if(req.body==null){
        

        pass_res.status=false;
        pass_res.message='field is empty';
        res.status(404).send(pass_res);
    }

    user_services.login(req.body,(err,result)=>{
        console.log("39== req body ::",req.body);
        
        if(err){
        
            pass_res.status=false;
            pass_res.message=err;
            res.status(400).send(pass_res);
        }
        else
        {
            var playload={
                'email':req.body.email
            }
            var token=generateToken.tokenGenrate(playload)
            console.log(token)
            pass_res.status=true;
            pass_res.data=result;
            pass_res.token=token;
            console.log(pass_res);
            res.status(200).send(pass_res);
        }

    })
}

exports.forgot=(req,res)=>{
   var res_forgot={}
    if(req.body==null){
        res_forgot.status=false;
        res_forgot.message='Field is empty';
        res.status(400).send(res_forgot)
}
user_services.forgot(req.body,(err,result)=>
{
    if(err){
        res_forgot.status=false;
        res_forgot.message=err;
        res.status(400).send(res_forgot);
    }
    else
    {
        res_forgot.status =true;
        res_forgot.data=result;
        var payload={
            email:req.body.email
        }
        console.log("payload",payload);
        
        var obj=generateToken.tokenGenrate(payload)
        var url=`http://localhost:3000/reset /\n${obj.token}`;
        console.log("in url ",url);
        
        sendMail.sendMailer(url)
        
        res_forgot.token=obj.token
        res.status(200).send(res_forgot)
        
    
    }
})

}





exports.reset=(req,res)=>{
    var pass_res={};
    if(req.body==null){
        

        pass_res.status=false;
        pass_res.message='field is empty';
        res.status(404).send(pass_res);
    }

    user_services.reset(req.body,(err,result)=>{
        console.log("122== req body ::",req.body);
        
        if(err){
        
            pass_res.status=false;
            pass_res.message=err;
            res.status(400).send(pass_res);
        }
        else
        {
            pass_res.status=true;
            pass_res.data=result;
            console.log(pass_res);
            res.status(200).send(pass_res);
        }

    })
}




exports.getAllUsers= (req,res) => {
    
    var res_result = {};

    user_services.getAllUsers((err,result) => {
        
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
