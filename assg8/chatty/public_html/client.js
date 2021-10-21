const URL_BASE = 'http://localhost:5000';

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

}