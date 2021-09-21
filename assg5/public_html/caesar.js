/*
* Author: Dylan Snavely
* Purpose: Defines code related to the execution of the Caesar Cipher encryption method.
*/

/*
* Fetches the text from the text input field in the document.
*/
function getText() {
    let txtIn = document.getElementById("textInput");
    return txtIn.value;
}

/*
* Fetches the shift amount from the range input field in the document.
*/
function getCipherAmount() {
    let cipherAmt = document.getElementById("cipherAmount");
    return Number.parseInt(cipherAmt.value);
}

/*
* Displays the current shift of the Caesar Cipher.
*/
function displayCipherAmount() {
    let cipherAmt = getCipherAmount();
    let label = document.getElementById("cipherAmountLabel");
    label.innerText = cipherAmt.toString();
}

/*
* Performs the Caesar Cipher on the contents of the html text input.
*/
function caesarCipher() {
    let originalString = getText();
    let cipherAmt = getCipherAmount();
    let encryptedString = "";
    for (let char of originalString) {
        char = char.toUpperCase();
        // Check if this char is a letter.
        if (char.toUpperCase() !== char.toLowerCase()) {
            // Char is a letter. Encrypt it.
            let charCode = ((char.charCodeAt(0) + cipherAmt) - 65) % 26 + 65;
            encryptedString += String.fromCharCode(charCode);
        } else {
            // Otherwise, add it to encrypted string unchanged.
            encryptedString += char;
        }
    }
    // Display the encrypted text in the top portion of the page
    let outputSection = document.getElementById("caesarCipherSection");
    outputSection.innerText = encryptedString;
}