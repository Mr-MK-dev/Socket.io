const socket = io();

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const message = e.target.elements.message.value;
    socket.emit('sendMessage', message, (error) => {
        if (error) {
            return console.log(error);
        }
        console.log(`Message delivered`);
    });
});

socket.on('message', (message) => {
    console.log(`message ==>`, message);
});

document.querySelector('#share-location').addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((position) => {
        const location = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
        socket.emit('sendLocation', location, (error) => {
            if (error) {
                return console.log(error);
            }
            console.log(`location shared`);
        });
    });
});
