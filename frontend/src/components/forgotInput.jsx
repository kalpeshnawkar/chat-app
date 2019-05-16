import React, { Component } from 'react';
import { toast ,ToastContainer} from 'react-toastify';
 import {forgotService} from '../services/userservices'
 export default class ForgotInput extends Component {
    constructor() {
        super()
        this.state = {
            email:''
            
        }
    };
    handleEmail = event => {
        try{
        const email= event.target.value;
        this.setState({ email: email});
        }
        catch(e)
        {
            console.log(e)
        }
    };
    handleSubmit=event=>{
        try{
        event.preventDefault();
        if(this.state.email === "")
        {
            toast("Email Can not be Empty",
            {
                position:toast.POSITION.BOTTOM_CENTER
            })
        }
        else if(!/[a-z0-9._%+-]+@gmail.com/.test(this.state.email))
        {
            toast("Email Invalid",
            {
                position:toast.POSITION.BOTTOM_CENTER
            })
        }
        else{
           var data = {
               "email":this.state.email

            }
            forgotService(data)
        }
    }
    catch(e){
        console.log(e)
    }
    }
    render() {
        return (
            <div className="mainDivForgot">
          
                <div className="login">

                    <font size="2"><h1>Forgot  Password</h1></font>
                    <br></br>
                    <div className="labelforgot">
                        <label><b>Email: </b> </label>
                    </div>
                    <input  style={{marginBottom:"30px"}} type="Email" value={this.state.email} placeholder="email" onChange={this.handleEmail} />
                    <div className="App">
                        <button type="submit" onClick={this.handleSubmit}><b>Reset My Password</b></button>
                    </div>

                </div>
                <ToastContainer />
            </div >
                





        );
    }
}
