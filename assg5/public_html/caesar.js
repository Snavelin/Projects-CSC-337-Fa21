function getText() {
    let txtIn = document.getElementById("textInput");
    return txtIn.value;
}

function getCipherAmount() {
    let cipherAmt = document.getElementById("cipherAmount");
    return Number.parseInt(cipherAmt.value);
}

function caesarCipher() {
    let originalString = getText();
    let cipherAmt = getCipherAmount();
    let encryptedString = "";
    for (let i = 0; i < originalString.length; i++) {
        let char = originalString[i].toUpperCase();
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
    let outputSection = document.getElementById("caesarCipherSection");
    outputSection.innerText = encryptedString;
}