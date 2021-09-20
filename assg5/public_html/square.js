function shuffle(array) {
    for (let i = 0; i < array.length; i++) {
        let j = Math.floor(Math.random() * (i + 1));
        let swap = array[i];
        array[i] = array[j];
        array[j] = swap;
    }
    return array;
}

function updateSquare() {
    let squareLetters = document.getElementsByTagName("td");
    let chars = [];     // Holds the chars of the square in order to shuffle them
    for (let i = 0; i < squareLetters.length; i++) {
        chars[i] = squareLetters[i].innerText;
    }
    shuffle(chars);
    // Update the state of the square in the html
    for (let i = 0; i < squareLetters.length; i++) {
        squareLetters[i].innerText = chars[i];
    }
}

function squareCipher() {
    let originalText = getText();
    let squareLetters = document.getElementsByTagName("td");
    let encryptedText = "";
    for (let char of originalText) {
        char = char.toUpperCase();
        if (char.toUpperCase() !== char.toLowerCase()) {
            let charCode = (char.charCodeAt(0) - 65) % 25;
            encryptedText += squareLetters[charCode].innerText;
        } else {
            encryptedText += char;
        }
    }
    let outputSection = document.getElementById("squareCipherSection");
    outputSection.innerText = encryptedText;
}