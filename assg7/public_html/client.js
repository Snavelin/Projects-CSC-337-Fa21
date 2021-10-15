function translate() {
    const fromLang = document.getElementById('fromLang').value;
    const toLang = document.getElementById('toLang').value;
    const mode = langCode(fromLang) + '2' + langCode(toLang);
    const wordsToTranslate = document.getElementById('inputText').value.replaceAll(' ', '+');

    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === request.DONE && request.status === 200) {
            let outputArea = document.getElementById('outputText');
            outputArea.innerText = request.responseText;
        }
    }

    console.log(`requesting http://localhost:5000/translate/${mode}/${wordsToTranslate}`);
    request.open('GET', `http://localhost:5000/translate/${mode}/${wordsToTranslate}`);
    request.send();
}

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