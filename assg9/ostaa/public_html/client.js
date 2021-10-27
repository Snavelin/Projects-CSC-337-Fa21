const URL_BASE = 'http://localhost'

function addUser() {
    const username = document.getElementById('usernameUserSection').value;
    const password = document.getElementById('password').value;

    const dataToSend = JSON.stringify({username: username, password: password});
    const url = `${URL_BASE}/add/user`;
    const request = new XMLHttpRequest();
    request.open('POST', url);
    request.send(dataToSend);
}

function addItem() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;
    const price = document.getElementById('price').value;
    const status = document.getElementById('status').value;
    const username = document.getElementById('usernameItemSection').value;

    const dataToSend = JSON.stringify({
        title: title,
        description: description,
        image: image,
        price: price,
        status: status,
        username: username
    });
    const url = `${URL_BASE}/add/item/${username}`;
    const request = new XMLHttpRequest();
    request.open('POST', url);
    request.send(dataToSend);
}