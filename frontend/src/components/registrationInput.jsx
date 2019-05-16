import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { withRouter } from 'react-router-dom';
import { userRegister } from '../services/userservices'
/**
 * create a registration class for regeistartion page
 */
class registrationInput extends Component {
    constructor() {
        super()
        /**
         * create a state array to get variable of registation page
         */
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
        this.BaseState = this.state
    };
    /**
     * create a event to handle first name 
     */

    handleFirstName = event => {
        try {
            const firstName = event.target.value;
            this.setState({ firstName: firstName });
        }
        catch (e) {
            console.log(e)
        }
    };
    /**
    * create a event to handle a last name 
    */

    handleLastName = event => {
        const lastName = event.target.value;
        this.setState({ lastName: lastName });
    };
    /**
    * create a event to handle a email 
    */

    handleEmail = event => {
        try {
            const email = event.target.value;
            this.setState({ email: email });
        }
        catch (e) {
            console.log(e)
        }
    };
    /**
    * create a event to handle password
    */
    handlePassword = event => {
        try {
            const password = event.target.value;
            this.setState({ password: password });
        }
        catch (e) {
            console.log(e)
        }
    };

    handleConfirmPassword = event => {
        const confirmPassword = event.target.value;
        this.setState({ confirmPassword: confirmPassword });
    };
    /**
     * create handleSubmit event to check validation of all variable 
     */
    handleSubmit = event => {
        try {
            event.preventDefault();
            if (this.state.firstName === "") {
                toast("First Name Can not be Empty",
                    {
                        position: toast.POSITION.BOTTOM_CENTER
                    })
            }
            else if (this.state.lastName === "") {
                toast("last Name Can not be Empty",
                    {
                        position: toast.POSITION.BOTTOM_CENTER
                    })
            }
            else if (this.state.email === "") {
                toast("Email Can not be Empty",
                    {
                        position: toast.POSITION.BOTTOM_CENTER
                    })
            }
            else if (!/[a-z0-9._%+-]+@gmail.com/.test(this.state.email)) {
                toast("Email Invalid",
                    {
                        position: toast.POSITION.BOTTOM_CENTER
                    })
            }

            else if (this.state.password.length < 8) {
                toast("password length must be atleast 8 characters long",
                    {
                        position: toast.POSITION.BOTTOM_CENTER
                    })
            }
            else if (this.state.password !== this.state.confirmPassword) {
                toast("password and confirm password must be same",
                    {
                        position: toast.POSITION.BOTTOM_CENTER
                    })
            }
            else {
                var data = {
                    "firstname": this.state.firstName,
                    "lastname": this.state.lastName,
                    "email": this.state.email,
                    "password": this.state.password,
                   
                   
                }
           
                userRegister(data)

            }
        }
        catch (e) {
            console.log(e)
        }
    }
    handleClear = () => {
        this.setState(this.BaseState);
    };
    onClickLogin = e => {
        e.preventDefault();
        this.props.history.push('/login')
    };

    render() {
        return (
            /**
             * invite  a mainDivRegistartion class to set a mainDiv   
             */

            <div className="mainDivRegistration">

                <div className="registration">

                    <h1>User Registration</h1>
                    <br></br>
                    <div className="labelregistration1">
                        <label><b>First Name: </b> </label>
                    </div>
                    <input type="text" value={this.state.firstName} placeholder="First Name" onChange={this.handleFirstName} />

                    <div className="labelregistration1">
                        <label> <b>Last Name: </b> </label>
                    </div>

                    <input type="text" value={this.state.lastName} placeholder="Last Name" onChange={this.handleLastName} />
                    <div className="labelregistration2">
                        <label> <b>Email: </b> </label>
                    </div>
                    <input type="email" value={this.state.email} placeholder="Email" onChange={this.handleEmail} />
                    <div className="labelregistration1">
                        <label> <b>Password: </b> </label>
                    </div>
                    <input type="password" value={this.state.password} placeholder="Password" onChange={this.handlePassword} />
                    <div className="labelregistration3">
                        <label> <b>Confirm Password: </b> </label>
                    </div>
                    <input style={{
                        marginBottom: "25px"
                    }} type="password" value={this.state.confirmPassword} placeholder="Confirm Password" onChange={this.handleConfirmPassword} />
                    <div >
                        <table >
                            <tr>

                                <th > <button className="submitButton" type="submit" onClick={this.handleSubmit}>Submit</button></th>
                                <th><button className="submitButton" type="submit" onClick={this.handleClear}>Clear</button></th>
                            </tr>
                        </table>
                    </div>
                    <div className="ul">
                        <u onClick={this.onClickLogin}>Already Registrated?</u>
                    </div>

                </div>
                <ToastContainer />
            </div>

        );


    }
}
export default withRouter(registrationInput);