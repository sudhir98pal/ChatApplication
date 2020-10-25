



const socket = io();
// accessing socket from sever on client side





// Elemets start *******************************

const $messageForm = document.querySelector('#messageOfForm');

const $InputOfMessageForm = $messageForm.querySelector('input');

const $ButtonOfMessageForm = $messageForm.querySelector('button')

const $shareLocationButton = document.querySelector('#shareLocationButton')

const $messages = document.querySelector('#messages')


//Elements end ********************************





// Templates start **************************************

const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;

//Templates end *****************************************




socket.on('message', (message) => {
    console.log(message);
  const fromatedMessage={
    message: message.message,
    createdAt: moment(message.createdAt).format('h:mm:ss')
    // moment library is loaded in script tag in index.html

  }
    const html = Mustache.render(messageTemplate,fromatedMessage);


    $messages.insertAdjacentHTML('beforeend', html);

})

socket.on('sharingLocation', (url) => {
    console.log(url);
    const Url = Mustache.render(locationTemplate,
        {
            locationMessage: 'My current Location',
            location: url
        })
    $messages.insertAdjacentHTML('beforeend', Url);


})


$messageForm.addEventListener('submit', (event) => {
    event.preventDefault(); // to prevents page from refreshing
    //const inputMessage=document.querySelector('input').value;

    $ButtonOfMessageForm.setAttribute('disabled', 'disabled');
    // disabling message sending button to avoid multiple clicks

    const inputMessage = event.target.elements.input_message.value;
    // this will help to avoid crashing if there are more (form input) on client side
    // inputMessage = filter.clean(inputMessage)
    socket.emit('sendMessage', inputMessage,

        (messagebackfromserver) => {
            console.log('Message was Delivered', messagebackfromserver);
        }

    );
    $ButtonOfMessageForm.removeAttribute('disabled');
    $InputOfMessageForm.value = '';
    // after sending message clearing old input message

    $InputOfMessageForm.focus();
    // moving  cursor back  to input of the form

})


$shareLocationButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (!navigator.geolocation) {
        return alert('Geolocation is Not Supported by the browser');
    }
    alert("You Are Sharing Your Geolocation!");
    $shareLocationButton.setAttribute('disabled', 'disabled');
    navigator.geolocation.getCurrentPosition((position) => {

        const Mylocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
        socket.emit('shareLocation', Mylocation, (locationMessage) => {
            $shareLocationButton.removeAttribute('disabled');
            console.log(locationMessage)

        })

    })

})