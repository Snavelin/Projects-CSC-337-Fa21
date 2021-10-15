/*
* Author: Dylan Snavely
* Purpose: A basic human language translation service. This program creates a database of
* translations, then opens a server hosted at localhost to receive requests. A request is made
* through the URL with the search terms at the end.
* Example:
*       localhost:5000/translate/e2g/car+airplane+climb+chair
*/

const fs = require('fs');
const readline = require('readline');
const express = require('express');
const app = express();

// Create the database, then open a server and process requests
createDatabase().then(
    function (dictionaries) {
        const port = 5000;
        const hostname = 'localhost';
        app.listen(port, hostname,
            function () {
               console.log(`Server running at http://${hostname}:${port}`);
            });

        app.use(express.static('public_html'));

        app.get('/translate/:mode/:words', function (req, res) {
            const mode = req.params.mode;
            if (mode in dictionaries) {
                const words = req.params.words.split('+');
                let responseText = '';
                for (const word of words) {
                    let translation = dictionaries[mode][word];
                    if (translation === undefined) {
                        translation = '?';
                    }
                    responseText += translation + ' ';
                }
                console.log(responseText);
                res.end(responseText);
            }
        });

        // Serve the landing page
        app.get('/:something', function (req, res) {
            res.sendFile('index.html', { root: 'public_html' });
            res.end();
        });
    }
);


/*
* Creates a database of dictionaries for translation. Each dictionary is mapped to its respective
* 'mode' (i.e. specifying which languages to translate between).
*/
async function createDatabase() {
    const e2sDict = await createDictionaryFromFile('Spanish.txt');
    const e2gDict = await createDictionaryFromFile('German.txt');
    const s2eDict = reverseDictionary(e2sDict);
    const g2eDict = reverseDictionary(e2gDict);
    const s2gDict = map(s2eDict, e2gDict);
    return {
        e2s: e2sDict,
        s2e: s2eDict,
        e2g: e2gDict,
        g2e: g2eDict,
        s2g: s2gDict,
        g2s: reverseDictionary(s2gDict)
    };
}

/*
* Creates a dictionary of fromWords to toWords where fromWords are in one language an toWords are
* in a different language.
* Params:
*       filename -- the path to a file containing the translation table
*/
async function createDictionaryFromFile(filename) {
    const file = readline.createInterface({
        input: fs.createReadStream(filename),
        crlfDelay: Infinity
    });
    let dict = {};
    for await (const line of file) {
        let words = line.split('\t');
        let fromWord = words[0];
        if (fromWord.startsWith('#'))
            continue;
        let toWord = words[1];
        toWord = toWord.split(',')[0];
        toWord = toWord.split('[')[0];
        toWord = toWord.split('(')[0];
        dict[fromWord] = toWord;
    }
    file.close();
    return dict;
}

/*
* Reverse the key-value pairs in a dictionary.
* Params:
*       dict -- the dictionary to be reversed
*/
function reverseDictionary(dict) {
    let revDict = {};
    for (const dictKey in dict) {
        revDict[dict[dictKey]] = dictKey;
    }
    return revDict;
}

/*
* Creates a dictionary with the keys of dict1 mapped to the values of dict2.
* Params:
*       dict1 -- the dictionary that will share keys with a new dictionary
*       dict2 -- the dictionary that will share values with a new dictionary
*/
function map(dict1, dict2) {
    let result = {};
    for (const dict1Key in dict1) {
        result[dict1Key] = dict2[dict1[dict1Key]];
    }
    return result;
}