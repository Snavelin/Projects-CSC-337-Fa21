const fs = require('fs');
const readline = require('readline');
const http = require('http');

const e2sDict = createDictionaryFromFile('Spanish.txt');
const e2gDict = createDictionaryFromFile('German.txt');
const dictionaries = {
    e2s: e2sDict,
    s2e: reverseDictionary(e2sDict),
    e2g: e2gDict,
    g2e: reverseDictionary(e2gDict),
}


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
        if (urlComponents[0] !== 'translate') {
            resContent = 'OK';
        } else {
            
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
async function reverseDictionary(dict) {
    let revDict = {};
    for (const dictKey in dict) {
        revDict[dict[dictKey]] = dictKey;
    }
    return revDict;
}