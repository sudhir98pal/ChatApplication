

const socket=io();
// accessing socket from sever on client side



socket.on('message',(message)=>
{
    console.log(message);
})

document.querySelector('#messageOfForm').addEventListener('submit',(event)=>
{
    event.preventDefault(); // to prevents page from refreshing
    //const inputMessage=document.querySelector('input').value;
    const inputMessage=event.target.elements.input_message.value;
    // this will help to avoid crashing if there are more (form input) on client side
    socket.emit('sendMessage',inputMessage);
})

//listening to server by socket.on
//  socket.on('countUpdated',(count)=>
//  {
//      console.log('counthasbeen updated! to '+count);

//  })

//  document.querySelector("#increament").addEventListener('click',()=>
//  {
//      console.log('clicked');
//      socket.emit('increament')
//  })