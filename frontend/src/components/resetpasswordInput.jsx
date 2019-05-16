import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { resetService } from '../services/userservices'
export default class resetpasswordInput extends Component {
    constructor() {
        super()
        this.state = {
            newPassword: '',
            confirmPassword: ''

        }
    };
    handleNewPassword = event => {
        try {
            const newPassword = event.target.value;
            this.setState({ newPassword: newPassword });
        }
        catch (e) {
            console.log(e)
        }
    };
    handleConfirmPassword = event => {
        try {
            const confirmPassword = event.target.value;
            this.setState({ confirmPassword: confirmPassword });
        }
        catch (e) {
            console.log(e)
        }
    };
    handleReset = event => {
        try {
            event.preventDefault()
            if (this.state.newPassword === "") {
                toast("New Password can not be empty", {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
            else if (this.state.confirmPassword === "") {
                toast("New Confirm Password can not be empty", {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
            else if (this.state.newPassword.length < 8) {
                toast("New Password must be atleast 8 character long",
                    {
                        position: toast.POSITION.TOP_RIGHT
                    })
            }


            else if (this.state.newPassword !== this.state.confirmPassword) {
                toast("password and confirm password must be same",
                    {
                        position: toast.POSITION.TOP_RIGHT
                    })
            }
            else {
                var data = {
                    'password': this.state.password
                }
                event.preventDefault()
                let currentUrl = window.location.pathname;
                let verifyUserToken = currentUrl.substr(15);
                resetService(data, verifyUserToken)

            }
        }
        catch (e) {
            console.log(e)
        }
    }
    render() {

        return (
            <div className="mainDivReset">
                <div className="login">

                    <font size="1.5"><h1>Reset Your Password</h1></font>
                    <br></br>
                    <div className="labelReset1">
                        <label><b>New Password: </b> </label>
                    </div>
                    <input style={{ marginBottom: "30px" }} type="password" value={this.state.newPassword} placeholder="New Password" onChange={this.handleNewPassword} />
                    <div className="labelReset2">
                        <label><b>Confirm Password: </b> </label>
                    </div>
                    <input style={{ marginBottom: "30px" }} type="password" value={this.state.confirmPassword} placeholder="Reenter Password" onChange={this.handleConfirmPassword} />
                    <div className="App">
                        <button onClick={this.handleReset}>Reset Password</button>
                    </div>

                </div>
                <ToastContainer />
            </div >






        );
    }
}