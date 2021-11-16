const wsConnection = new WebSocket("ws://localhost:8999");
const sendButton = document.querySelector("#send");
const input = document.querySelector("#text");
const messageBox = document.querySelector("#messages");

wsConnection.onopen = () => {
    console.log("Connection ready");
};

wsConnection.onclose = e => {

    if (e.wasClean) {
        console.log('Connection clear');
    } else {
        alert('Connection error');
    }

    console.table({
        'Code': e.code,
        'Reason': e.reason});
}

wsConnection.onerror = e => {
    console.log(`Error: ${e.message}`);
}

wsConnection.onmessage = e => {
    printMessage(e.data);
}

const sendMessage = message => {
    if(!wsConnection.readyState){
        setTimeout(function (){
            wsSend(message);
        }, 100);
    } else {
        wsConnection.send(message);
    }
}

sendButton.onclick = e => {
    if (input.value){
        sendMessage(input.value);
        input.value = "";
    }
}

async function printMessage(message) {
    message = await message.text()
    messageBox.innerHTML += createMessageHTML(message);
}

const createMessageHTML = message => `<div class=\"message\">  <div class=\"text\">${message}</div> <div class=\"time\"></div>${new Date().toLocaleString()}</div>`;