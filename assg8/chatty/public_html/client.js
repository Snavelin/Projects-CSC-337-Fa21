/*
* Author: Dylan Snavely
* Purpose: This is the code portion of the Chatty app client. It defines functions
* to communicate with the app server (i.e. sending a single message, fetching all stored
* messages).
*/

const URL_BASE = 'http://localhost:5000';
setInterval(fetchMessages, 1000);  // ping the server for messages every second

/*
* Sends a text message to the server. Each message has an alias and the message text itself.
* These two components are delivered through the URL of the request.
*/
function sendMessage() {
    const alias = document.getElementById('alias').value;
    const message = document.getElementById('message').value;

    const request = new XMLHttpRequest();

    const url = `${URL_BASE}/chats/post/${alias}/${message}`;
    console.log(`attempting POST ${url}`);
    request.open('POST', url);
    request.send();
}

/*
* Fetches all the text messages currently held by the server. Each message alias and
* text is inserted into index.html.
*/
function fetchMessages() {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === request.DONE && request.status === 200) {
            const responseData = JSON.parse(request.responseText);
            console.log(responseData);
            let chatHtml = '';
            for (const record of responseData) {
                let alias = record.alias;
                let message = record.message;
                chatHtml += `<div class="chatMessage"><b>${alias}: </b>${message}</div>`;
            }
            const chatSection = document.getElementById('chatSection');
            chatSection.innerHTML = chatHtml;
        }
    }

    const url = `${URL_BASE}/chats`;
    console.log(`attempting GET ${url}`);
    request.open('GET', url);
    request.send();
}