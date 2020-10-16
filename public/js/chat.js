const socket=io();
// accessing socket from sever on client side



//listening to server by socket.on
 socket.on('countUpdated',(count)=>
 {
     console.log('counthasbeen updated! to '+count);

 })

 document.querySelector("#increament").addEventListener('click',()=>
 {
     console.log('clicked');
     socket.emit('increament')
 })