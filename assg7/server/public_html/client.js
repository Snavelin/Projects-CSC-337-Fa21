/*
* Author: Dylan Snavely
* Purpose: This file is the code portion of the client of the translation service.
* Words that the client wants to translate are given to the server via the url in a GET request.
*/

/*
* Makes a request to a server to translate a set of input words.
*/
function translate() {
    const fromLang = document.getElementById('fromLang').value;
    const toLang = document.getElementById('toLang').value;
    const mode = langCode(fromLang) + '2' + langCode(toLang);
    const wordsToTranslate = document.getElementById('inputText').value.replaceAll(' ', '+');

    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === request.DONE && request.status === 200) {
            // When request is fulfilled, display translation text
            let outputArea = document.getElementById('outputText');
            outputArea.innerText = request.responseText;
        }
    }

    const url = `http://localhost:5000/translate/${mode}/${wordsToTranslate}`;
    console.log(`requesting ${url}`);
    request.open('GET', url);
    request.send();
}

/*
* Converts the select value from index.html to a single letter.
*
* Params:
*       value -- the select value
*/
function langCode(value) {
    switch (value) {
        case 'eng':
            return 'e';
        case 'spa':
            return 's';
        case 'ger':
            return 'g';
    }
}