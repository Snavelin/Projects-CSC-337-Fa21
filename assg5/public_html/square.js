/*
* Author: Dylan Snavely
* Purpose: Defines code related to the execution of the Square Cipher encryption method.
*/

/*
* Shuffles the contents of the given list.
* Params:
*       list -- the list to be shuffled.
*/
function shuffle(list) {
    for (let i = 0; i < list.length; i++) {
        let j = Math.floor(Math.random() * (i + 1));
        let swap = list[i];
        list[i] = list[j];
        list[j] = swap;
    }
    return list;
}

/*
* Shuffles the contents of the square for the Square Cipher.
*/
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

/*
* Performs the Square Cipher on the contents of the html text input.
* This does not update the square. For that, see updateSquare().
*/
function squareCipher() {
    let originalText = getText();
    let squareLetters = document.getElementsByTagName("td");
    let encryptedText = "";
    // Encrypt each char
    for (let char of originalText) {
        char = char.toUpperCase();
        // Check if this char is a letter.
        if (char.toUpperCase() !== char.toLowerCase() && char !== 'Z') {
            // Is a letter. Encrypt it.
            let charPos = (char.charCodeAt(0) - 65);  // Get letter's position in alphabet, starting at 0.
            encryptedText += squareLetters[charPos].innerText;
        } else {
            // Otherwise, add it to encrypted string unchanged.
            encryptedText += char;
        }
    }
    // Display the encrypted text in the bottom portion of the page
    let outputSection = document.getElementById("squareCipherSection");
    outputSection.innerText = encryptedText;
}