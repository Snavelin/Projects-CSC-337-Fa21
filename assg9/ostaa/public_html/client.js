/*
* Author: Dylan Snavely
* Purpose: This is the code portion of the Ostaa online store client. It defines functions
* to communicate with the app server (i.e. registering a new user, adding an item to a user's
* listings).
*/

const URL_BASE = 'http://localhost'

/*
* Requests that a new user be added to the database via POST. The user's username and password are
* fetched from the DOM.
*/
function addUser() {
    const username = document.getElementById('usernameUserSection').value;
    const password = document.getElementById('password').value;

    const dataToSend = JSON.stringify({username: username, password: password});
    const url = `${URL_BASE}/add/user`;
    const request = new XMLHttpRequest();
    request.open('POST', url);
    request.send(dataToSend);
}

/*
* Requests that a new item be added to the database via POST. The item's fields and associated
* username are fetched from the DOM.
*/
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