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