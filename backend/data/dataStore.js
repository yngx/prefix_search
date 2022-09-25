const fs = require('fs');
const readline = require('readline');
const data = require('../trie');

const processWordListAsync = async () => {
    const fileStream = fs.createReadStream('/Users/xaoyang/Development/Vercel/backend/data/millionWordList.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const wordStore = new data.Trie();
    for await (const line of rl) {
        wordStore.insert(line);
    }

    return wordStore;
}


exports.processWordListAsync = processWordListAsync;