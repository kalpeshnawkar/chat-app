import React, { Component } from 'react';
import { MenuItem } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { chatServices, chat, chatDisplay } from '../services/chatservices';
import "react-toastify/dist/ReactToastify.css";
import MessageDisplay from './messageDisplay'
//import { Socket } from 'net';
import io from 'socket.io-client'
const socket = io.connect('http://localhost:4000')



/**
 * create dashboard Class for login Page
 */
class dashboardInput extends Component {
    constructor(props) {
        super(props);
        /**
         * create a state array for variable of login page
         *  */
        this.state = {
            onlineUser: [],
            msgArray: [],
            receiver: '',
            messageDisplay: '',
            message: '',
            Sender: '',
            msg: []


        };
    }

    componentDidMount() {
        try {
            chatServices() //getAllUsers 
                .then((result) => {
                    console.log("Chat service==== ", result.data.data)
                    this.setState({
                        onlineUser: result.data.data
                    })
                })
                .catch((err) => {
                    // console.log(err)
                    alert(err)

                })


            chat() //getAllChat
                .then((result) => {
                    console.log("chat===", result.data.data)
                    this.setState({
                        msgArray: result.data.data

                    })
                    console.log("msgArray==", this.state.msgArray)
                })

                .catch((err) => {
                    // console.log(err)
                    alert(err)

                })
                const Sender = localStorage.getItem('Sender')
                socket.on(Sender, (result) => {
                    const msg = this.state.msg;
                    msg.push(result)
                    this.setState({ msg: msg });
                    console.log(result);
                    
                    console.log("msg==", this.state.msg)
                })

        }
        catch (e) {
            console.log(e)
        }

    }

    handleMessage = (e) => {
        this.setState({ message: e.target.value });
    }

    handleSubmit = (event) => {
    
            event.preventDefault()
            const Sender = localStorage.getItem('Sender')
            console.log(Sender)
            this.setState({ Sender: Sender })
            console.log("sender is :", Sender)
            console.log("selected receiver:", this.state.receiver);
           
            chatDisplay(Sender,this.state.receiver,this.state.message)
            var request = {
                senderID: Sender,
                receiverID: this.state.receiver,
                message: this.state.message

            }
            socket.emit("new_msg", request)
            this.setState({
                message: '',
                anchorEl: null
            });
            this.setState({ messageDisplay: this.state.message });
            this.handleClick = this.handleClick.bind(this);

           
        }
    handleClick = (key, event) => {
        try {
            this.setState({ anchorEl: null });
            let receiver = event.target.textContent;
            this.setState({ receiver: receiver });
            console.log("receiver is ", this.state.receiver)
        }
        catch (e) {
            console.log(e)
        }

    }
    onClickLogOut = e => {
        try {
            e.preventDefault();
            this.props.history.push('/login')
        }
        catch (e) {
            console.log(e)
        }
    };

    render() {
        try {
           

            const loginUser = this.state.onlineUser.map(key => {
                if (key.email !== localStorage.getItem('Sender')) {
                    return (
                        <MenuItem onClick={(event) => this.handleClick(key, event)}>{key.email}</MenuItem>
                    )

                }
                return loginUser
            })
            const msg = this.state.msg.map((key) => {
                return (
                    <div>
                        <MenuItem>{key.senderID}:{key.message}</MenuItem>
                    </div>
                )}
            )
            return (

                <div className="mainDivDashBoard">
                    <div className="dashboard">

                        <h1>Welcome To Chatapp</h1>
                        
                        <div className="welcome" >
                            <label><b>Welcome:</b> {localStorage.getItem('Sender')}</label>
                        </div>
                        <div className="logout">
                            <u onClick={this.onClickLogOut}><b>LogOut</b></u>

                        </div>
                    
                    </div >

                    <div style={{ display: "flex", justifyContent: "space-between", height: "418px", paddingTop: "0px", background_color: "rgb(10,255,10)" }}>
                        <div style={{
                            border: "3px solid black", width: "300px", background: "white", marginLeft: "1%", marginTop: "3%"
                        }}
                        >
                            <label> <b>USERLIST</b> </label>
                            <div>
                                {loginUser}
                            </div>
                        </div>
                        <div  className="message">
                       
                            {this.state.receiver}
                            
                        
                            {<MessageDisplay msgArray={this.state.msgArray} receiverId={this.state.receiver}  />}
                           <div className="msg1">{msg}</div>
                        
                        </div>



                    </div>
                    <div >
                        <input className="typeMessage" type="text" value={this.state.message} onChange={this.handleMessage} placeholder="Type Message Here" />
                        <button onClick={this.handleSubmit} style={{ marginRight: "-45%", width: "75px" }} >Send</button>
                    </div>


                </div>

            )
        }
        catch (e) {
            console.log(e)
        }

    }

}

export default withRouter(dashboardInput);