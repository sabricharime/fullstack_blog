import { Socket } from "socket.io";

function socketServer(socket:Socket){

  socket.on("message", message =>{

    socket.emit('message', message)
  })
}


export default socketServer
