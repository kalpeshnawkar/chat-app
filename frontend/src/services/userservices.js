
import axios from 'axios';
import { toast } from "react-toastify";
import { withRouter } from 'react-router-dom';
function userRegister(data) {

    axios.post('/register', data)
        .then(function (response) {
            console.log("hi")
            toast("registered Successfully")
            console.log(response)
            window.location.href='/login'
          

        })
        .catch(function (err) {
            console.log(err)
            toast("User with email id already exists!!")
        })
}

function userLogin(email, password) {
    axios.post('/login', {
        "email": email,
        "password": password
    })
        .then(function (response) {
            localStorage.setItem("token",response.data.token)
            localStorage.setItem("Sender", email);
        

            console.log(response)
            toast("Login Successful")
            window.location.href='/dashboard'
        

        })
        .catch(function (err) {
            console.log(err)
            toast("login unsucesssful")
        })
}

function forgotService(data) {
    axios.post('/forgotpassword', data)
    
        .then(function (response) {
            console.log("response in front",response)
            console.log("token",response.data)
            var token1=response.data;
            console.log("token1",token1)
           const token2=token1.substring(34);
            localStorage.setItem("verifyUserToken",token2)
           
            toast("Valid Email")
        })
        .catch(function(err){
            console.log(err)
            toast("Password are not registered")

        })
}

function  resetService(data,token) {
    axios.post(`/reset${token}`, data,{
    Headers:{
        'token':token

    }})
    
        .then(function (response) {
            console.log(response)
            toast("reset Password")
            window.location.href='/login'
            
            
        })
        .catch(function(err){
            console.log(err)
            toast("Password not reset")

        })
}

export
{
    userLogin, userRegister,forgotService, resetService




}
export default withRouter(forgotService,resetService);