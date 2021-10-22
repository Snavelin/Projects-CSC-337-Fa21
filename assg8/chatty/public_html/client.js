const URL_BASE = 'http://localhost:5000';
setInterval(fetchMessages, 1000);  // ping the server for messages every second

function sendMessage() {
    const alias = document.getElementById('alias').value;
    const message = document.getElementById('message').value;

    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === request.DONE && request.status === 200) {

        }
    }

    const url = `${URL_BASE}/chats/post/${alias}/${message}`;
    console.log(`attempting POST ${url}`);
    request.open('POST', url);
    request.send();
}

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