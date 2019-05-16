import React, { Component } from 'react';
export default class MessageDisplay extends Component {

    render() {
        

        return (
            this.props.msgArray.map((key) =>
                <div>
                    {key.receiverID === localStorage.getItem("Sender") ?
                        (
                            key.senderID === this.props.receiverId ?
                                
                                    
                                    <div className="senderDiv">
                                       
                                        <div>{key.message } </div>
                                        </div>
                                    
                                 : (
                                   null
                                )
                        ) : (
                            null
                        )}
                    {
                        key.receiverID === this.props.receiverId?
                            (
                                
                                <div className="receiverDiv">
                                    
                                    <div>{key.message}</div>

                                </div>
                            
                            ) : (
                                null
                            )
                    }


                </div>
            )



//kshiteej





        )
    }
}
//kshiteej
