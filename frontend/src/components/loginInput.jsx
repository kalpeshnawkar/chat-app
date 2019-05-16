import React, { Component } from 'react';
import { userLogin } from '../services/userservices'
import { toast, ToastContainer } from "react-toastify";
import { withRouter } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
/**
 * create loginInput Class for login Page
 */
class loginInput extends Component {
    constructor(props) {
        super(props)

        /**
         * create a state array for variable of login page
         *  */
        this.state = {
            email: '',
            password: '',
            toast: false,
            alt: ''
        };
    }
    /**
     * create  a event for to chane email id
     */

    handleuserEmailChange = event => {
        const email = event.target.value;
        this.setState({ email: email });
    };
    /**
     * cerate a event for to change password
     */
    handlerPasswordChange = event => {
        try {

            const password = event.target.value;
            this.setState({ password: password });
        }
        catch (e) {
            console.log(e)
        }
    };
    /**
     * cerete a event for to get login
     */
    handleLogin = event => {
        try {
            event.preventDefault()
            if (!this.state.email) {
                console.log("toast called")
                toast("Email Cannot Be Empty", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
            else if (!/[a-z0-9._%+-]+@gmail.com/.test(this.state.email)) {
                toast("Email Invalid",
                    {
                        position: toast.POSITION.BOTTOM_CENTER
                    })
            }
            else if (!this.state.password) {
                toast("password Cannot Be Empty", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }

            else if (this.state.password.length < 8) {
                toast("password must be of 8 atleast characters long !", {
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }
            else {
                userLogin(this.state.email, this.state.password);
            }
        }
        catch (e) {
            console.log(e);
        }

    }
    /**
     * get event to get a frogot password page
     */
    onClickForgot = e => {
        try {
            e.preventDefault();
            this.props.history.push('/forgotpassword')
        }
        catch (e) {
            console.log(e)
        }
    };
    /**
     * get a event to get a  registration  page
     */
    onClickRegistration = e => {
        try {
            e.preventDefault();
            this.props.history.push('/register')
        }
        catch (e) {
            console.log(e);
        }
    };

    render() {
        return (
            <div className="mainDivLogin">
                {/* <img src={require('../assets/images/index.png')} alt='welcome to chatapp'/>  */}
                <div className="login">

                    <h1>User LogIn</h1>
                    <br></br>

                    <div className="labellogin1">
                        <label><b>Email: </b> </label>
                    </div>
                    <input type="email" value={this.state.email} placeholder="email" onChange={this.handleuserEmailChange} />

                    <div className="labellogin2">
                        <label> <b>Password: </b> </label>
                    </div>

                    <input style={{
                        marginBottom: "17px"
                    }}

                        type="Password" value={this.state.password} placeholder="Password" onChange={this.handlerPasswordChange} /><br></br>

                    <div className="App">
                        <button type="submit" onClick={this.handleLogin}><b> LOGIN</b> </button>

                    </div>
                    <div style={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <div className="ul">
                            <u onClick={this.onClickForgot}><b>Forgot Password?</b></u><br></br>
                            <u onClick={this.onClickRegistration}><b>Register</b></u>

                        </div>

                        <br></br>
                    </div>

                </div>
                <ToastContainer />
            </div >






        );
    }
}

export default withRouter(loginInput);