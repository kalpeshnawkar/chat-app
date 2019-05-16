import axios from 'axios';
import io from 'socket.io-client'
const socket = io.connect('http://localhost:4000')
function chatServices(data) {
    return axios('/getAllUsers',
        {
            method: "GET",
            data:data
        })
}


function chat() {


    return axios('/getAllChats',
        {
            method: "GET"
        })


}

function chatDisplay(Sender,receiver,message) {
   
   // socket.emit("new_msg", request);
   socket.on("emitMsg", (result) => {
       console.log(message);
       
        console.log(result);
    
    })
}

export {
    chatServices, chat, chatDisplay
}

