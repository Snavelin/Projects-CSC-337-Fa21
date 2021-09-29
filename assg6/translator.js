const fs = require('fs');
const readline = require('readline');
const http = require('http');

createDatabase().then(function (dictionaries) {
    const port = 5000;
    const hostname = 'localhost';
    const server = http.createServer(
        function (req, res) {
            res.statusCode = 200;

            let urlComponents = req.url.split('/').slice(1);
            console.log(`Requesting ${req.url}`);
            console.log(urlComponents);
            // todo: Check if request is to translate, otherwise send 'OK'
            let resContent = '';
            if (urlComponents.length < 2 || urlComponents[0] !== 'translate' || !(urlComponents[1] in dictionaries)) {
                resContent = 'OK';
            } else {
                let mode = urlComponents[1];
                let words = urlComponents[2].split('+');
            }
            // todo: Translate words from url

            res.end(resContent);
        }
    );

    server.listen(port, hostname,
        function () {
            console.log(`Server running at http://${hostname}:${port}/`);
        }
    );
});



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

function map(dict1, dict2) {
    let result = {};
    for (const dict1Key in dict1) {
        result[dict1Key] = dict2[dict1[dict1Key]];
    }
    return result;
}